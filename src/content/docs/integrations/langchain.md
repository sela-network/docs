---
title: LangChain Integration
description: Building AI agents with LangChain and Sela Network browser automation
---

## LangChain and Browser Automation

[LangChain](https://www.langchain.com/) is the leading framework for building applications powered by large language models. While LLMs excel at reasoning and text generation, they cannot directly interact with the web—they require tools to navigate websites, fill forms, extract data, and execute multi-step workflows.

Sela Network provides LangChain with production-grade browser automation capabilities that go beyond traditional web scraping:

- **Authentic browser environments** that bypass bot detection
- **Structured data extraction** via hybrid DOM + VLM parsing
- **Cryptographic verification** through zkTLS proofs
- **Session persistence** for multi-step workflows
- **Geographic distribution** for region-locked content

This integration enables AI agents built with LangChain to interact with any website as if they were human users, unlocking use cases previously impossible with API-only approaches.

## Architecture Overview

```
┌──────────────────────────────────────────────────┐
│           LangChain Agent                        │
│                                                  │
│  ┌────────────────┐    ┌──────────────────┐     │
│  │  LLM (GPT-4,   │───→│  Agent Executor  │     │
│  │  Claude, etc)  │    └────────┬─────────┘     │
│  └────────────────┘             │               │
│                                  │               │
│                    ┌─────────────┴─────────────┐ │
│                    │                           │ │
│             ┌──────▼────────┐       ┌─────────▼──────┐
│             │  Sela Browser │       │  Other Tools   │
│             │      Tool     │       │  (Calculator,  │
│             └──────┬────────┘       │   Database,    │
│                    │                │   APIs, etc)   │
│                    │                └────────────────┘
└────────────────────┼──────────────────────────────────┘
                     │
                     │ API Request
                     ↓
            ┌────────────────────┐
            │  Sela Network      │
            │  - Global Nodes    │
            │  - zkTLS Proofs    │
            │  - VLM Parsing     │
            └────────┬───────────┘
                     │
                     ↓
            ┌────────────────────┐
            │   Target Website   │
            └────────────────────┘
```

The Sela tool integrates seamlessly into LangChain's tool ecosystem, allowing agents to dynamically decide when browser automation is needed based on the task at hand.

## Installation & Setup

### Prerequisites

```bash
pip install langchain>=0.1.0
pip install langchain-openai  # or langchain-anthropic, langchain-google-genai
pip install sela-network
```

### API Key Configuration

```python
import os
from langchain_openai import ChatOpenAI
from sela_network import SelaClient

# Set up API keys
os.environ["OPENAI_API_KEY"] = "your-openai-api-key"
os.environ["SELA_API_KEY"] = "your-sela-api-key"

# Initialize clients
llm = ChatOpenAI(model="gpt-4-turbo", temperature=0)
sela_client = SelaClient(api_key=os.environ["SELA_API_KEY"])
```

Get your Sela API key from the [developer dashboard](https://dashboard.sela.network).

## Quick Start: Basic Browser Tool

### Creating the Sela Tool

```python
from langchain.tools import Tool
from langchain.agents import AgentExecutor, create_react_agent
from langchain import hub

def sela_browse(url: str) -> str:
    """
    Navigate to a URL and extract structured content.

    Args:
        url: The website URL to visit

    Returns:
        JSON-formatted page content
    """
    result = sela_client.browse(
        url=url,
        format="json-ld",  # Schema.org structured output
        wait_until="networkidle"
    )
    return result.to_json()

# Wrap in LangChain Tool
sela_tool = Tool(
    name="web_browser",
    description="Navigate to websites and extract content. Use when you need to fetch real-time information from the web that isn't available via API. Input should be a valid URL.",
    func=sela_browse
)
```

### Building a Simple Agent

```python
# Get ReAct prompt template from LangChain Hub
prompt = hub.pull("hwchase17/react")

# Create agent with Sela browser tool
agent = create_react_agent(
    llm=llm,
    tools=[sela_tool],
    prompt=prompt
)

# Execute agent
agent_executor = AgentExecutor(
    agent=agent,
    tools=[sela_tool],
    verbose=True,
    handle_parsing_errors=True
)

# Example query
response = agent_executor.invoke({
    "input": "What is the current price of Bitcoin on Coinbase?"
})

print(response["output"])
```

**Output**:
```
Thought: I need to check Coinbase for the current Bitcoin price.
Action: web_browser
Action Input: https://www.coinbase.com/price/bitcoin

Observation: {"@type": "Product", "name": "Bitcoin", "offers": {"price": 67234.50, "priceCurrency": "USD"}, ...}

Thought: I now know the Bitcoin price.
Final Answer: The current price of Bitcoin on Coinbase is $67,234.50 USD.
```

## Advanced Use Cases

### Multi-Step Workflow with Session Persistence

E-commerce price comparison requiring authentication:

```python
def sela_login_and_search(site: str, query: str) -> str:
    """Login to a site and perform search with session persistence."""

    # Step 1: Create persistent session and login
    session_id = sela_client.browse(
        url=f"https://{site}/login",
        actions=[
            {"type": "fill", "selector": "#email", "value": "user@example.com"},
            {"type": "fill", "selector": "#password", "value": os.environ["SITE_PASSWORD"]},
            {"type": "click", "selector": "#submit"},
            {"type": "wait", "selector": ".user-dashboard"}  # Wait for login
        ],
        create_session=True  # Persist cookies and auth state
    )

    # Step 2: Navigate to search using same session
    results = sela_client.browse(
        url=f"https://{site}/search?q={query}",
        session_id=session_id,  # Reuse authenticated session
        format="json-ld"
    )

    sela_client.close_session(session_id)
    return results.to_json()

login_search_tool = Tool(
    name="authenticated_search",
    description="Search products on e-commerce sites that require login. Input format: 'site_domain|search_query' (e.g., 'amazon.com|laptop')",
    func=lambda input: sela_login_and_search(*input.split("|"))
)
```

### Form Filling Agent

AI agent that fills out complex forms:

```python
def fill_form(url: str, form_data: dict) -> str:
    """
    Navigate to a form URL and fill it with provided data.

    Args:
        url: Form URL
        form_data: Dictionary of {field_name: value}

    Returns:
        Confirmation message or form submission result
    """
    # Convert form_data into Sela actions
    actions = []
    for field, value in form_data.items():
        actions.append({
            "type": "fill",
            "selector": f"[name='{field}'], #{field}",  # Try name or id
            "value": value
        })

    # Add submit action
    actions.append({"type": "click", "selector": "button[type='submit'], input[type='submit']"})

    result = sela_client.browse(
        url=url,
        actions=actions,
        wait_until="networkidle"
    )

    return f"Form submitted successfully. Result: {result.to_json()}"

form_tool = Tool(
    name="fill_web_form",
    description="Fill and submit web forms. Input must be JSON with 'url' and 'data' fields. Example: {'url': 'https://example.com/contact', 'data': {'name': 'John', 'email': 'john@example.com', 'message': 'Hello'}}",
    func=lambda input: fill_form(**eval(input))
)
```

### Data Collection Agent with zkTLS Proofs

Collect verifiable financial data:

```python
def get_verified_data(url: str) -> str:
    """
    Extract data with cryptographic proof of authenticity.

    Returns both data and zkTLS proof for verification.
    """
    result = sela_client.browse(
        url=url,
        format="json-ld",
        generate_proof=True  # Enable zkTLS verification
    )

    return {
        "data": result.data,
        "proof": result.proof,  # Cryptographic attestation
        "timestamp": result.timestamp,
        "verifiable": True
    }

verified_data_tool = Tool(
    name="get_verified_web_data",
    description="Fetch data from websites with cryptographic proof of authenticity. Use for financial, legal, or compliance-critical information. Input: URL",
    func=lambda url: str(get_verified_data(url))
)
```

### Multi-Agent Collaboration

Multiple specialized agents working together:

```python
from langchain.agents import AgentExecutor, create_react_agent

# Agent 1: Price monitoring specialist
price_monitor_agent = create_react_agent(
    llm=llm,
    tools=[sela_tool],
    prompt=hub.pull("hwchase17/react")
)

# Agent 2: Inventory checker
inventory_agent = create_react_agent(
    llm=llm,
    tools=[sela_tool, form_tool],
    prompt=hub.pull("hwchase17/react")
)

# Coordinator agent that delegates to specialists
def coordinate_shopping(product: str, max_price: float) -> str:
    """Coordinate multiple agents to find and purchase product."""

    # Agent 1: Find best price
    price_executor = AgentExecutor(agent=price_monitor_agent, tools=[sela_tool])
    price_result = price_executor.invoke({
        "input": f"Find the lowest price for {product} across Amazon, Walmart, and Best Buy"
    })

    # Agent 2: Check inventory and purchase
    inventory_executor = AgentExecutor(agent=inventory_agent, tools=[sela_tool, form_tool])
    purchase_result = inventory_executor.invoke({
        "input": f"Check if {product} is in stock at {price_result['best_site']} and complete checkout if price is under ${max_price}"
    })

    return purchase_result["output"]
```

## Integrating with LangGraph for Complex Workflows

[LangGraph](https://blog.langchain.com/langgraph/) enables stateful, multi-step agent workflows. Combined with Sela, this enables sophisticated browser automation pipelines:

```python
from langgraph.graph import Graph, END

# Define workflow states
workflow = Graph()

def navigate(state):
    """Navigate to target URL."""
    result = sela_client.browse(url=state["url"], create_session=True)
    return {"session_id": result.session_id, "content": result.data}

def analyze(state):
    """Analyze page content with LLM."""
    analysis = llm.invoke(f"Analyze this page and determine next action: {state['content']}")
    return {"next_action": analysis}

def interact(state):
    """Perform interaction based on analysis."""
    if "click" in state["next_action"]:
        result = sela_client.browse(
            session_id=state["session_id"],
            actions=[{"type": "click", "selector": state["next_action"]["selector"]}]
        )
        return {"content": result.data, "completed": False}
    return {"completed": True}

# Build graph
workflow.add_node("navigate", navigate)
workflow.add_node("analyze", analyze)
workflow.add_node("interact", interact)

workflow.add_edge("navigate", "analyze")
workflow.add_edge("analyze", "interact")
workflow.add_conditional_edges(
    "interact",
    lambda state: "navigate" if not state.get("completed") else END
)

workflow.set_entry_point("navigate")

# Compile and execute
app = workflow.compile()
result = app.invoke({"url": "https://example.com/multi-step-process"})
```

This pattern enables [visual web browser agents](https://learnopencv.com/langgraph-building-a-visual-web-browser-agent/) that can navigate complex multi-page workflows autonomously.

## Real-World Examples

### Example 1: Market Research Agent

```python
from langchain.agents import AgentExecutor, create_react_agent
from langchain import hub

def create_research_agent():
    """Build an agent that researches companies and competitors."""

    research_prompt = """You are a market research assistant. You can browse websites to gather competitive intelligence.

Available tools:
- web_browser: Navigate to URLs and extract structured data
- get_verified_web_data: Get data with cryptographic proof (use for financial/legal data)

When researching a company:
1. Visit their homepage for overview
2. Check their pricing page
3. Look for customer reviews
4. Analyze competitor sites for comparison
5. Summarize findings

Current objective: {input}

{agent_scratchpad}"""

    tools = [sela_tool, verified_data_tool]
    agent = create_react_agent(llm=llm, tools=tools, prompt=research_prompt)
    return AgentExecutor(agent=agent, tools=tools, verbose=True)

# Usage
research_agent = create_research_agent()
report = research_agent.invoke({
    "input": "Research Stripe's pricing and compare with PayPal and Square. Provide a summary with verified financial data where possible."
})
```

### Example 2: Automated Trading Signal Generator

```python
def create_trading_agent():
    """Agent that monitors multiple exchanges for arbitrage opportunities."""

    def check_arbitrage(symbol: str) -> str:
        """Check price differences across exchanges."""
        exchanges = [
            "https://www.binance.com/en/trade/BTC_USDT",
            "https://www.coinbase.com/price/bitcoin",
            "https://www.kraken.com/prices/bitcoin"
        ]

        prices = []
        for exchange_url in exchanges:
            result = sela_client.browse(
                url=exchange_url,
                format="json-ld",
                generate_proof=True  # Verifiable pricing data
            )
            prices.append({
                "exchange": exchange_url.split("//")[1].split("/")[0],
                "price": result.data.get("offers", {}).get("price"),
                "proof": result.proof
            })

        # Calculate spread
        max_price = max(p["price"] for p in prices)
        min_price = min(p["price"] for p in prices)
        spread_pct = ((max_price - min_price) / min_price) * 100

        return {
            "symbol": symbol,
            "prices": prices,
            "spread": spread_pct,
            "opportunity": spread_pct > 0.5  # 0.5% threshold
        }

    arbitrage_tool = Tool(
        name="check_crypto_arbitrage",
        description="Check for arbitrage opportunities across exchanges. Input: cryptocurrency symbol (e.g., 'BTC')",
        func=check_arbitrage
    )

    agent = create_react_agent(llm=llm, tools=[arbitrage_tool], prompt=hub.pull("hwchase17/react"))
    return AgentExecutor(agent=agent, tools=[arbitrage_tool])

# Usage
trading_agent = create_trading_agent()
signal = trading_agent.invoke({"input": "Check for BTC arbitrage opportunities"})
```

### Example 3: Automated Job Application Agent

```python
def create_job_application_agent(resume_data: dict):
    """Agent that finds and applies to jobs matching criteria."""

    def search_and_apply(job_title: str, location: str) -> str:
        """Search for jobs and auto-apply."""

        # Search LinkedIn
        search_results = sela_client.browse(
            url=f"https://www.linkedin.com/jobs/search/?keywords={job_title}&location={location}",
            format="json-ld"
        )

        jobs = search_results.data.get("itemListElement", [])[:5]  # Top 5 matches

        applications = []
        for job in jobs:
            job_url = job.get("url")

            # Apply to job
            result = sela_client.browse(
                url=job_url,
                actions=[
                    {"type": "click", "selector": ".jobs-apply-button"},
                    {"type": "fill", "selector": "#name", "value": resume_data["name"]},
                    {"type": "fill", "selector": "#email", "value": resume_data["email"]},
                    {"type": "fill", "selector": "#phone", "value": resume_data["phone"]},
                    {"type": "upload", "selector": "#resume", "file": resume_data["resume_path"]},
                    {"type": "click", "selector": ".submit-application"}
                ]
            )

            applications.append({
                "job_title": job.get("title"),
                "company": job.get("hiringOrganization", {}).get("name"),
                "status": "submitted" if result.success else "failed"
            })

        return {"applications_submitted": len([a for a in applications if a["status"] == "submitted"]), "details": applications}

    job_tool = Tool(
        name="job_search_and_apply",
        description="Search for jobs and automatically apply. Input format: 'job_title|location' (e.g., 'Software Engineer|San Francisco')",
        func=lambda input: str(search_and_apply(*input.split("|")))
    )

    agent = create_react_agent(llm=llm, tools=[job_tool], prompt=hub.pull("hwchase17/react"))
    return AgentExecutor(agent=agent, tools=[job_tool])
```

## Best Practices

### 1. Error Handling

Always implement robust error handling:

```python
def robust_browse(url: str) -> str:
    try:
        result = sela_client.browse(url=url, timeout=30000)
        return result.to_json()
    except TimeoutError:
        return "Error: Page took too long to load"
    except Exception as e:
        return f"Error: {str(e)}"
```

### 2. Rate Limiting

Respect website rate limits and implement backoff:

```python
import time
from tenacity import retry, stop_after_attempt, wait_exponential

@retry(stop=stop_after_attempt(3), wait=wait_exponential(min=1, max=10))
def browse_with_retry(url: str):
    return sela_client.browse(url=url)
```

### 3. Cost Optimization

Cache results to avoid redundant requests:

```python
from functools import lru_cache

@lru_cache(maxsize=100)
def browse_cached(url: str) -> str:
    """Cache browser results for 5 minutes."""
    return sela_client.browse(url=url).to_json()
```

### 4. Structured Output

Always request structured data formats:

```python
# Good: Structured JSON-LD output
result = sela_client.browse(url=url, format="json-ld")

# Avoid: Raw HTML (harder for LLM to parse)
result = sela_client.browse(url=url, format="html")
```

## Performance Considerations

### Async Execution for Parallel Browsing

```python
import asyncio
from sela_network import AsyncSelaClient

async def parallel_browse(urls: list[str]):
    """Browse multiple URLs concurrently."""
    async_client = AsyncSelaClient(api_key=os.environ["SELA_API_KEY"])

    tasks = [async_client.browse(url=url) for url in urls]
    results = await asyncio.gather(*tasks)

    return [r.to_json() for r in results]

# Usage
urls = ["https://site1.com", "https://site2.com", "https://site3.com"]
results = asyncio.run(parallel_browse(urls))  # 3x faster than sequential
```

### Selective zkTLS Proof Generation

Only generate proofs when verification is necessary:

```python
def browse_with_optional_proof(url: str, needs_verification: bool = False):
    """Generate zkTLS proof only for sensitive data."""
    return sela_client.browse(
        url=url,
        generate_proof=needs_verification  # False = faster, True = verifiable
    )

# Financial data: needs proof
bank_balance = browse_with_optional_proof("https://bank.com/balance", needs_verification=True)

# General content: no proof needed
news_article = browse_with_optional_proof("https://news.com/article", needs_verification=False)
```

## Integration with Other LangChain Components

### Memory Systems

Combine with [LangChain memory](https://python.langchain.com/docs/modules/memory/) for context-aware browsing:

```python
from langchain.memory import ConversationBufferMemory

memory = ConversationBufferMemory(return_messages=True)

agent_executor = AgentExecutor(
    agent=agent,
    tools=[sela_tool],
    memory=memory,  # Remember previous browsing sessions
    verbose=True
)

# First query
agent_executor.invoke({"input": "Check the price of iPhone 15 on Apple's website"})

# Follow-up query (uses memory of previous context)
agent_executor.invoke({"input": "Now compare it with Samsung Galaxy S24"})
```

### Retrieval-Augmented Generation (RAG)

Combine web browsing with vector search:

```python
from langchain.vectorstores import Chroma
from langchain.embeddings import OpenAIEmbeddings

# Browse and store content
def browse_and_store(url: str):
    result = sela_client.browse(url=url)
    content = result.data

    # Store in vector DB
    vectorstore = Chroma.from_texts(
        texts=[content],
        embedding=OpenAIEmbeddings(),
        metadatas=[{"source": url}]
    )
    return "Content stored successfully"

# Later: Retrieve and synthesize
def search_browsed_content(query: str):
    vectorstore = Chroma(embedding_function=OpenAIEmbeddings())
    docs = vectorstore.similarity_search(query)
    return docs
```

## Troubleshooting

### Common Issues

**Issue**: Agent doesn't call Sela tool
**Solution**: Improve tool description to clearly indicate when it should be used:
```python
description="Use this to fetch real-time data from websites. DO NOT use for general knowledge questions. Input must be a valid URL starting with http:// or https://"
```

**Issue**: Selector not found
**Solution**: Use Sela's self-healing selectors or provide fallback logic:
```python
actions=[
    {"type": "click", "selector": "#primary-btn, .btn-primary, button.cta"}  # Try multiple selectors
]
```

**Issue**: Session expires
**Solution**: Implement session refresh logic:
```python
if result.error == "SessionExpired":
    # Re-authenticate and retry
    session_id = sela_client.browse(..., create_session=True)
    result = sela_client.browse(session_id=session_id, ...)
```

## Conclusion

LangChain + Sela Network enables AI agents to interact with the web at a level previously impossible with traditional APIs or scraping tools. The combination of LangChain's powerful agent framework with Sela's browser automation infrastructure unlocks use cases spanning market research, automated trading, job applications, competitive intelligence, and beyond.

As [AI agent adoption reaches 85% of organizations](https://www.index.dev/blog/ai-agents-statistics), the ability to autonomously navigate and extract data from websites will become a critical capability. This integration provides the production-ready foundation for building those systems.

## Sources

- [LangChain Web Browsing AI Agent](https://cobusgreyling.medium.com/langchain-web-browsing-ai-agent-e58852ade69e) - Implementation patterns for browser automation agents
- [How Airtop built web-automation for AI agents powered by LangChain](https://blog.langchain.com/customers-airtop/) - Production case study
- [MultiOn x LangChain: Next-Gen Web Automation](https://blog.langchain.com/multion-x-langchain-powering-next-gen-web-automation-navigation-with-ai/) - Web navigation integration
- [Mastering Browser Automation with LangChain and Playwright](https://medium.com/@abhyankarharshal22/mastering-browser-automation-with-langchain-agent-and-playwright-tools-c70f38fddaa6) - Technical implementation guide
- [Browser-use with OpenAI + LangChain](https://medium.com/@sumit.somanchd/browser-use-with-openai-langchain-for-automating-web-browsing-ba6db7439566) - Automation patterns
- [Visual Web Agents with LangGraph](https://learnopencv.com/langgraph-building-a-visual-web-browser-agent/) - Multi-step workflow implementation
- [50+ Key AI Agent Statistics 2025](https://www.index.dev/blog/ai-agents-statistics) - Adoption trends
- [LangChain Hyperbrowser Integration](https://python.langchain.com/docs/integrations/tools/hyperbrowser_browser_agent_tools/) - Official browser tool documentation
