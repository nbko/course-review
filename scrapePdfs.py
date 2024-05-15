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
    'retPath': 'https://uchicago.bluera.com/uchicago/Login/Login.aspx?ReturnUrl=%2fuchicago%2frpvf-eng.aspx%3flang%3deng%26redi%3d1%26SelectedIDforPrint%3d13039fa46e6b8e4a3745a8aa52a1752881640e457b194c0f7eea537b8de29f05f1474bfc5e8b63ec00a16f13577c40f1%26ReportType%3d2%26regl%3den-US',
    'lnid': 'c64bccfd-56f2-46b7-b5fb-09b3e0958172',
    'f': 'GOClD9wyRQwscMr0HIHQkCR2xiTL8aEdpY72_--AOkFfjpPHmWiQkN_ui3_LvlOTJQeE9yBuMTnq7XwPKVvytZattNGlbfPwSvaFYHSMz_M1',
    '_shibsession_756368696361676f475768747470733a2f2f756368696361676f2e626c756572612e636f6d2f756368696361676f2f73686962626f6c6574682f64656661756c74': '_10991e75f3531ab4c794630b3cbfeca8',
    'CookieName': '156F192258E75601E7710654EB601D48370A64BCCB4660450A7D081B4008FC5C9AE6081F39DF9B6C40208C370FDE898C1E848302B74BEBF4859FEAF5FCABF1C3898A0829FE76E354411853CA96FDFC3FBE9C94B513DD78EC72893A591DFA426FB15C1E5BC9E684E17D1C395CF4DF20D3A38982E23325A7E04130E458A01457628763874FAFD0CE1A1C02AD21736AB12E',
    'session_token': '4602563f7e8046b7854270fc83bbb09a',
}

headers = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
    'Accept-Language': 'en-US,en;q=0.9,ko;q=0.8',
    'Cache-Control': 'max-age=0',
    'Connection': 'keep-alive',
    # 'Cookie': 'cookiesession1=678B28920D6B6E1A11CBED63AF11D0D5; ASP.NET_SessionId=2uulbtd0vbs5sbg2n5sv2xrw; regl=en-US; lang=eng; retPath=https://uchicago.bluera.com/uchicago/Login/Login.aspx?ReturnUrl=%2fuchicago%2frpvf-eng.aspx%3flang%3deng%26redi%3d1%26SelectedIDforPrint%3d13039fa46e6b8e4a3745a8aa52a1752881640e457b194c0f7eea537b8de29f05f1474bfc5e8b63ec00a16f13577c40f1%26ReportType%3d2%26regl%3den-US; lnid=c64bccfd-56f2-46b7-b5fb-09b3e0958172; f=GOClD9wyRQwscMr0HIHQkCR2xiTL8aEdpY72_--AOkFfjpPHmWiQkN_ui3_LvlOTJQeE9yBuMTnq7XwPKVvytZattNGlbfPwSvaFYHSMz_M1; _shibsession_756368696361676f475768747470733a2f2f756368696361676f2e626c756572612e636f6d2f756368696361676f2f73686962626f6c6574682f64656661756c74=_10991e75f3531ab4c794630b3cbfeca8; CookieName=156F192258E75601E7710654EB601D48370A64BCCB4660450A7D081B4008FC5C9AE6081F39DF9B6C40208C370FDE898C1E848302B74BEBF4859FEAF5FCABF1C3898A0829FE76E354411853CA96FDFC3FBE9C94B513DD78EC72893A591DFA426FB15C1E5BC9E684E17D1C395CF4DF20D3A38982E23325A7E04130E458A01457628763874FAFD0CE1A1C02AD21736AB12E; session_token=4602563f7e8046b7854270fc83bbb09a',
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

response = session.get('https://uchicago.bluera.com/uchicago/rpvf-eng.aspx', params=params, cookies=cookies, headers=headers)

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




