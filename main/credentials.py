'''from google.cloud import texttospeech
from google.oauth2 import service_account

# Load the credentials
credentials = service_account.Credentials.from_service_account_file(
    "/Users/sindhujaaavula/Documents/vamshi/project/credentials/ascendant-altar-436720-b5-8b410b7e5efc.json" "/Users/sindhujaaavula/Documents/vamshi/project/credentials/ascendant-altar-436720-b5-31250adbe398.json" )

# Initialize the Text-to-Speech client using the loaded credentials
tts_client = texttospeech.TextToSpeechClient(credentials=credentials)

'''
# credentials.py
from google.oauth2 import service_account

# Specify the path to your service account JSON file
credentials_path_1 = '/Users/sindhujaaavula/Documents/vamshi/project/credentials/ascendant-altar-436720-b5-8b410b7e5efc.json'
credentials_path_2 = '/Users/sindhujaaavula/Documents/vamshi/project/credentials/ascendant-altar-436720-b5-31250adbe398.json'

# Load credentials from the specified files
credentials_1 = service_account.Credentials.from_service_account_file(credentials_path_1)
credentials_2 = service_account.Credentials.from_service_account_file(credentials_path_2)

# Export the credentials for use in other files
def get_credentials():
    return credentials_1, credentials_2
