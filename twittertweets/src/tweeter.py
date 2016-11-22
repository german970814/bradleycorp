from twitter_ads.client import Client

APP_KEY = 'DZVs2NUJ7YPcPHhWG5R1gSlNP'
APP_SECRET = 'DaBE3QI20JxdsTSwK6gcFnZy8fCpJvSFvR7ef65bN47phwGaIn'
OAUTH_TOKEN = '98639399-rtbnotGc9tPEAXMRjocDw1peZXia8I3kzD9PA3KtK'
OAUTH_TOKEN_SECRET = '5sGjNJGBbUSsdzV6Hv2w3Soy2Eos8cDwCUOxuUeq3Ylaj'
ACCOUNT_ID = '18ce54fanqc'

# initialize the client
client = Client(APP_KEY,APP_SECRET,OAUTH_TOKEN,OAUTH_TOKEN_SECRET)

# load the advertiser account instance
account = client.accounts(ACCOUNT_ID)

