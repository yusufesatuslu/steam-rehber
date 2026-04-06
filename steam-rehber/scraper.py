import requests
from bs4 import BeautifulSoup
import json

def get_steam_deals():
    # Steam'deki indirimli ürünleri çeker
    url = "https://store.steampowered.com/search/?specials=1"
    headers = {'User-Agent': 'Mozilla/5.0'}
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.text, 'html.parser')
    
    deals = []
    items = soup.find_all('div', class_='search_result_row')[:10] # İlk 10 fırsat
    
    for item in items:
        title = item.find('span', class_='title').text
        price = item.find('div', class_='search_price').text.strip()
        link = item['href']
        deals.append({"title": title, "price": price, "link": link})
    
    # Verileri JavaScript'in okuyabileceği bir JSON dosyasına kaydeder
    with open('data.json', 'w') as f:
        json.dump(deals, f)

# Bu fonksiyonu bir "Cron Job" ile günde 1 kez çalıştırabilirsin.
get_steam_deals()