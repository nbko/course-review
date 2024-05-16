from bs4 import BeautifulSoup
import requests
import json

# bring the web page
import requests

session = requests.Session()

import requests

cookies = {
    'cookiesession1': '678B28920D6B6E1A11CBED63AF11D0D5',
    'ASP.NET_SessionId': '2uulbtd0vbs5sbg2n5sv2xrw',
    'regl': 'en-US',
    'lang': 'eng',
    'retPath': 'https://uchicago.bluera.com/uchicago/Login/Login.aspx?ReturnUrl=%2fuchicago%2frpvf-eng.aspx%3flang%3deng%26redi%3d1%26SelectedIDforPrint%3d9fce034e1b0521b1541ba1199d003dd33fe64723fb2e3fa0536d1d1cd2962bd19a78f0848b33c672b8bcec3b1cc7c8ec%26ReportType%3d2%26regl%3den-US',
    'lnid': '5c7eac26-7efd-4b55-9abf-4abbbba6fee2',
    '_shibsession_756368696361676f475768747470733a2f2f756368696361676f2e626c756572612e636f6d2f756368696361676f2f73686962626f6c6574682f64656661756c74': '_f58fa99f870ce2eda9e0b659d9973656',
    'CookieName': 'F65F254B20FCD74855E5EE332D5B904AC8F3AB2B3C0D906EE9D42882AB5095176EBA17F3601B69484DA1177508B2F709A7E0B4448399E947EBB23AFADD9DF5AF98D32C80035D7FD1695806F688EB55B729633A98393172E82A97C26ECDCB27DCA5AAC76F10B9E975A2C57F84E506950D1F000FFB63AF9D23473188853867A5A96448EF6FAD5AEA59A9080E5F7C542DF4',
    'session_token': '827a5721ba374513b80aef3b432f975c',
}

headers = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
    'Accept-Language': 'en-US,en;q=0.9,ko;q=0.8',
    'Cache-Control': 'max-age=0',
    'Connection': 'keep-alive',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'none',
    'Sec-Fetch-User': '?1',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    'sec-ch-ua': '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"macOS"',
}

params = {
    'lang': 'eng',
    'redi': '1',
    'SelectedIDforPrint': '13039fa46e6b8e4a3745a8aa52a1752881640e457b194c0f7eea537b8de29f05f1474bfc5e8b63ec00a16f13577c40f1',
    'ReportType': '2',
    'regl': 'en-US',
}

response = requests.get('https://uchicago.bluera.com/uchicago/rpvf-eng.aspx', params=params, cookies=cookies, headers=headers)

reviews = {}

if response.status_code == 200:
    html = response.text
    soup = BeautifulSoup(html, "html.parser")

    # find the comments section - they are under report-block class
    comments = soup.select(".report-block")

    for comment in comments[:8]:
        # find the title for each section
        title = comment.select_one(".ReportBlockTitle > span").get_text()

        #extract the comments under the section
        all_reviews = comment.select(".CommentBlockRow.TableContainer > .block-table.CondensedTabular > tbody")
        review = [r.text for r in all_reviews]

        #remove all new lines
        if len(review) != 0:
            rr = review[0].split('\n\n')
            cleaned_review = [r.strip() for r in rr if r.strip()]

            reviews[title] = cleaned_review

    #json_data = json.dumps(reviews)
    with open('data.json', 'w', encoding='utf-8') as f:
        json.dump(reviews, f, ensure_ascii=False, indent=4)

else:
    print(response.status_code)




