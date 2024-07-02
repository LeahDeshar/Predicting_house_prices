from fastapi import FastAPI, Request
from pydantic import BaseModel
from typing import Dict
import nltk
from fastapi.middleware.cors import CORSMiddleware
from nltk.sentiment import SentimentIntensityAnalyzer

# Download VADER lexicon for sentiment analysis
nltk.download('vader_lexicon')

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Initialize sentiment analyzer
sia = SentimentIntensityAnalyzer()

class Comment(BaseModel):
    text: str

@app.post("/analyze_comment/")
async def analyze_comment(comment: Comment):
    sentiment_scores = sia.polarity_scores(comment.text)
    sentiment = "neutral"
    emoji = "😐"

    if sentiment_scores['compound'] >= 0.05:
        sentiment = "positive"
        emoji = "😊"
    elif sentiment_scores['compound'] <= -0.05:
        sentiment = "negative"
        emoji = "😞"

    return {"sentiment": sentiment, "emoji": emoji}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
