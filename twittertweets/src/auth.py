import re
from twython import Twython

APP_KEY = 'DZVs2NUJ7YPcPHhWG5R1gSlNP'
APP_SECRET = 'DaBE3QI20JxdsTSwK6gcFnZy8fCpJvSFvR7ef65bN47phwGaIn'
callback_uri = 'https://127.0.0.1/callback'    #call-back for localhost

twitter = Twython(APP_KEY, APP_SECRET)
auth = twitter.get_authentication_tokens(callback_url=callback_uri)

OAUTH_TOKEN = auth['oauth_token']
OAUTH_TOKEN_SECRET = auth['oauth_token_secret']

print 'Follow link: ' + str(auth['auth_url'])

redirect_url = raw_input('Paste the full redirect URL here.')

oauth_verifier = re.search("(?<=oauth_verifier=).*", redirect_url).group(0)

twitter = Twython(APP_KEY, APP_SECRET, OAUTH_TOKEN, OAUTH_TOKEN_SECRET)

final_step = twitter.get_authorized_tokens(oauth_verifier)

F_OAUTH_TOKEN = final_step['oauth_token']
F_OAUTH_TOKEN_SECRET = final_step['oauth_token_secret']

print 'F_OAUTH : ' + F_OAUTH_TOKEN
print 'F_OAUTH_SECRET: ' + F_OAUTH_TOKEN_SECRET

