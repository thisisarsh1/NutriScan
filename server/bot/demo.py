import textwrap
import google.generativeai as genai
from IPython.display import display, Markdown
import re
from dotenv import load_dotenv
import os

load_dotenv()

# A dictionary to keep track of conversations per user
conversation_history = {}

def bot_gemini(user_input, user_id):
    def to_markdown(text):
        text = text.replace('•', '  *')
        return Markdown(textwrap.indent(text, '> ', predicate=lambda _: True))

    GOOGLE_API_KEY = 'your api key'
    if not GOOGLE_API_KEY:
        raise ValueError("No API key found. Please set the GOOGLE_API_KEY environment variable.")

    genai.configure(api_key=GOOGLE_API_KEY)
    model = genai.GenerativeModel('gemini-1.5-flash')

    # Retrieve the conversation history for the user
    history = conversation_history.get(user_id, "")

    try:
        # Append the new user input to the history
        history += f"User: {user_input}\n"

        # Generate content based on the user input and conversation history
        response = model.generate_content(f"{history}Bot:")

        # Extract and display the generated text content
        content = response.candidates[0].content.parts[0].text

        # Clean up the response
        cleaned_string = re.sub(r'[*\n]', '', content)
        
        # Update the conversation history with the bot's response
        history += f"Bot: {cleaned_string}\n"
        conversation_history[user_id] = history

        return cleaned_string

    except Exception as e:
        print(f"Error generating content: {e}")

if __name__ == "__main__":
    user_id = "user_123"  # Example user ID
    
    i = 1
    while i>0 : 
        user_input = input("Say something ?")
        if user_input =="0":
            break
        print(bot_gemini(user_input, user_id))
        i +=1
