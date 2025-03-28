import requests
import base64

CONFIG_URL = "https://your-hosted-url/config.json"

response = requests.get(CONFIG_URL)
config = response.json()

encoded_token = config["DISCORD_TOKEN"]
TOKEN = base64.b64decode(encoded_token).decode()
