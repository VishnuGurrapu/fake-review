from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="Fake Review Detection API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ReviewRequest(BaseModel):
    review: str


@app.post("/predict")
def predict_review(payload: ReviewRequest):
    prediction = "Fake" if len(payload.review) < 20 else "Real"
    return {"prediction": prediction}


# Run with:
# uvicorn main:app --reload
