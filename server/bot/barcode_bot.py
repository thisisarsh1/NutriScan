import textwrap
import google.generativeai as genai
import re
from dotenv import load_dotenv
import os
from .models import BotResponse, Barcode_bot

load_dotenv()

def bot_gemini_bot(user_input, user_id, barcode_number):
    def to_markdown(text):
        text = text.replace('•', '  *')
        return textwrap.indent(text, '> ', predicate=lambda _: True)

    GOOGLE_API_KEY = os.getenv('GOOGLE_API_KEY')

    if not GOOGLE_API_KEY:
        raise ValueError("No API key found. Please set the GOOGLE_API_KEY environment variable.")

    genai.configure(api_key=GOOGLE_API_KEY)
    model = genai.GenerativeModel('gemini-1.5-flash')

    # Get conversation history for the user, limiting to the most recent 10 interactions
    conversation_history = Barcode_bot.objects.filter(user_barcode__user_id=user_id, user_barcode=barcode_number).order_by('question_id')


    # Reverse the conversation history to maintain chronological order
    conversation_history = reversed(conversation_history)

    # Build history string
    history = "\n".join(f"User: {response.question}\nBot: {response.bot_response}" for response in conversation_history)

    try:
        # Append new user input to the history
        history += f"\nUser: {user_input}\nBot:"

        # Generate content based on the user input and conversation history
        response = model.generate_content(history)

        # Extract and clean the generated text content
        content = response.candidates[0].content.parts[0].text
        cleaned_string = re.sub(r'[*\n]', '', content)

        # Save the response in the database
        # Barcode_bot.objects.create(question=user_input, bot_response=cleaned_string, user_id=user_id)

        return cleaned_string

    except Exception as e:
        print(f"Error generating content: {e}")
        return "Sorry, I couldn't process your request."
