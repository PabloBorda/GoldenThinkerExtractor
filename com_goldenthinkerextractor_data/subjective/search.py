from search_engines import Google
from search_engines import Bing
from search_engines import Yahoo
from search_engines import Duckduckgo
from search_engines import Startpage
from search_engines import Aol
from search_engines import Dogpile
from search_engines import Ask
from search_engines import Mojeek
from search_engines import Brave
from search_engines import Torch


import requests
import random

# Define a list of user agent strings for various browsers
user_agents = [
    # Chrome on Windows
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.71 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36",
    
    # Safari on macOS
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.71 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Safari/605.1.15",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36",

    # Firefox on Windows
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:90.0) Gecko/20100101 Firefox/90.0",
    # Edge on Windows
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.71 Safari/537.36 Edg/94.0.992.50",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36 Edg/93.0.961.47",

    # Opera on Windows
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.71 Safari/537.36 OPR/81.0.4196.60",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36 OPR/78.0.4093.231",

    # Opera on macOS
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.71 Safari/537.36 OPR/81.0.4196.60",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36 OPR/78.0.4093.231",

    # Opera on Linux
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.71 Safari/537.36 OPR/81.0.4196.60",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36 OPR/78.0.4093.231",

    # Mobile Safari on iPhone
    "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1",
    "Mozilla/5.0 (iPhone; CPU iPhone OS 14_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Mobile/15E148 Safari/604.1",
    
    # Mobile Chrome on Android
    "Mozilla/5.0 (Linux; Android 11; Pixel 4a) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.71 Mobile Safari/537.36",
    "Mozilla/5.0 (Linux; Android 10; SM-G960U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.71 Mobile Safari/537.36"
]


def get_random_user_agent():
    return random.choice(user_agents)

def get_webpage_text(url):
    try:
        random_user_agent = get_random_user_agent()
        response = requests.get(url, headers={"User-Agent": random_user_agent})
        response.raise_for_status()  # Raise an exception for non-2xx status codes
        return response.text
    except requests.exceptions.RequestException as e:
        print(f"Error fetching {url}: {e}")
        return None


def search(q=""):
    print("Executing Query: " + q)
    engines = [Google(),Bing(),Yahoo(),Duckduckgo(),Startpage(),Aol(),Dogpile(),Ask(),Mojeek(),Brave(),Torch()]
    current_engine = 0
    for engine in engines:
        try:
            engine = engines[current_engine]
            results = engine.search(q)
            links = results.links()
            if links: 
               break
        except:
            current_engine = current_engine + 1
        
    return links



def find_matching_link(company_name, links):
  """
  This function finds the link in the list that best matches the company name,
  considering company name presence in domain and domain length.

  Args:
      company_name (str): The company name to match against.
      links (list): A list of URLs.
      threshold (int, optional): The maximum Levenshtein distance for a considered match (less relevant here). Defaults to 3.

  Returns:
      str: The URL with the shortest domain containing the company name, or None if no match is found.
  """

  company_name_lower = company_name.lower()

  # Find links with company name in domain and prioritize shorter ones
  best_match = None
  best_match_length = float('inf')  # Initialize with a large value
  for link in links:
    try:
      from urllib.parse import urlparse
      parsed_url = urlparse(link)
      domain = parsed_url.netloc.lower()
      if company_name_lower in domain and len(domain) < best_match_length:
        best_match = link
        best_match_length = len(domain)
    except ValueError:  # Handle invalid URLs gracefully
      pass

  return best_match



company_name = "Segment"
links = search("Company " + company_name)
if links:
    print("Links returned: " + str(links))
    company_url = find_matching_link(company_name,links=links)
    print("The company url is: " + str(company_url))
else:
    print("No links")
