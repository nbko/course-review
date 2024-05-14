from bs4 import BeautifulSoup
import requests
import json


# bring the web page
import requests

cookies = {
    'cookiesession1': '678B28920D6B6E1A11CBED63AF11D0D5',
    'ASP.NET_SessionId': '2uulbtd0vbs5sbg2n5sv2xrw',
    'regl': 'en-US',
    'lang': 'eng',
    'retPath': 'https://uchicago.bluera.com/uchicago/Login/Login.aspx?ReturnUrl=%2fuchicago%2frpvf-eng.aspx%3flang%3deng%26redi%3d1%26SelectedIDforPrint%3d7fe4390316924f7ff1e57b7ba46266597c83cd6a1c8e936ccf5ff4931d072fc9842946f32b0fc1b072e5c1da2560937a%26ReportType%3d2%26regl%3den-US',
    'lnid': '50102701-8770-4bd8-9491-cc34fd35a8ce',
    '_shibsession_756368696361676f475768747470733a2f2f756368696361676f2e626c756572612e636f6d2f756368696361676f2f73686962626f6c6574682f64656661756c74': '_553bdd13ad4b4901a11c293a34f1ebee',
    'CookieName': 'FC5072EF765611607035988940F8F8D80F1CED6CFE04B91BDB4FD07C02AA5E32D6154F7AAD3D32555DB86D9BDF6230F4190BFE8C10F1DF13FFC94DFF8C60E12FD713467998E9F4486B74A01B92FAC5C11CC3AA00147F22AACFF6A71247C72A33EC652E8AAEB48E906BEEE1B3771D26239DB197425E2F332DB2161375FA3D3AC730276381785D1F7FEA805778B2EA5369',
    'session_token': '64051e9fed1c4d69817ab2bb88af8dd3',
}

headers = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
    'Accept-Language': 'en-US,en;q=0.9,ko;q=0.8',
    'Cache-Control': 'max-age=0',
    'Connection': 'keep-alive',
    # 'Cookie': 'cookiesession1=678B28920D6B6E1A11CBED63AF11D0D5; ASP.NET_SessionId=2uulbtd0vbs5sbg2n5sv2xrw; regl=en-US; lang=eng; retPath=https://uchicago.bluera.com/uchicago/Login/Login.aspx?ReturnUrl=%2fuchicago%2frpvf-eng.aspx%3flang%3deng%26redi%3d1%26SelectedIDforPrint%3d7fe4390316924f7ff1e57b7ba46266597c83cd6a1c8e936ccf5ff4931d072fc9842946f32b0fc1b072e5c1da2560937a%26ReportType%3d2%26regl%3den-US; lnid=50102701-8770-4bd8-9491-cc34fd35a8ce; _shibsession_756368696361676f475768747470733a2f2f756368696361676f2e626c756572612e636f6d2f756368696361676f2f73686962626f6c6574682f64656661756c74=_553bdd13ad4b4901a11c293a34f1ebee; CookieName=FC5072EF765611607035988940F8F8D80F1CED6CFE04B91BDB4FD07C02AA5E32D6154F7AAD3D32555DB86D9BDF6230F4190BFE8C10F1DF13FFC94DFF8C60E12FD713467998E9F4486B74A01B92FAC5C11CC3AA00147F22AACFF6A71247C72A33EC652E8AAEB48E906BEEE1B3771D26239DB197425E2F332DB2161375FA3D3AC730276381785D1F7FEA805778B2EA5369; session_token=64051e9fed1c4d69817ab2bb88af8dd3',
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

    # the course review is structured
    comments = soup.select(".report-block")

    for comment in comments[:2]:
        title = comment.select_one(".ReportBlockTitle > span").get_text()
        all_reviews = comment.select(".CommentBlockRow.TableContainer > .block-table.CondensedTabular > tbody")
        review = [r.text for r in all_reviews]
        rr = review[0].split('\n\n')
        cleaned_review = [r.strip() for r in rr if r.strip()]
        review_lst = []

        reviews[title] = cleaned_review

    json_data = json.dumps(reviews)
    print("json:", json_data)
    # print("dic:", reviews)

else:
    print(response.status_code)




