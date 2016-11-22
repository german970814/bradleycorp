import re
from twython import Twython

APP_KEY = 'ztQo6Ln4mdoH4vsz68orpMGHD'
APP_SECRET = 'uNrQ0tDqkPDwic7Pb8P5euVxD85uw9lTdQ1krfNHBMwp26HHOV'
callback_uri = 'https://127.0.0.1/callback'    #call-back for localhost

twitter = Twython(APP_KEY, APP_SECRET)
auth = twitter.get_authentication_tokens(callback_url=callback_uri)

OAUTH_TOKEN = auth['oauth_token']
OAUTH_TOKEN_SECRET = auth['oauth_token_secret']

print 'Follow link: ' + str(auth['auth_url'])

redirect_url = raw_input('Paste the full redirect URL here.')

oauth_verifier = re.search('(?<=oauth_verifier=).*',redirect_url).group(0)

twitter = Twython(APP_KEY, APP_SECRET, OAUTH_TOKEN, OAUTH_TOKEN_SECRET)

final_step = twitter.get_authorized_tokens(oauth_verifier)

F_OAUTH_TOKEN = final_step['oauth_token']
F_OAUTH_TOKEN_SECRET = final_step['oauth_token_secret']

print 'Final user tokens saved...'

