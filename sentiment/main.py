from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from transformers import pipeline

app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Load the sentiment analysis model
sentiment_analyzer = pipeline('sentiment-analysis')

@app.get("/")
def read_root():
    return {"message": "Welcome to the Sentiment Analysis API"}

@app.post("/predict-sentiment/")
async def predict_sentiment(data: dict = Body(...)):
    try:
        text = data.get('text')
        if not text:
            raise HTTPException(status_code=400, detail="Text field is required")

        # Perform sentiment analysis
        result = sentiment_analyzer(text)[0]

        return {"label": result['label'], "score": result['score']}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='0.0.0.0', port=8000)
