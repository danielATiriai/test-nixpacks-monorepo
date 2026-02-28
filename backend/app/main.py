import os
import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="test-nixpacks-monorepo-backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup_event():
    database_url = os.environ.get("DATABASE_URL")
    if database_url:
        logger.info("DATABASE_URL is set — database is available")
    else:
        logger.info("DATABASE_URL is not set — running without database")


@app.get("/")
async def root():
    return {"service": "test-nixpacks-monorepo-backend"}


@app.get("/health")
async def health():
    return {"status": "ok"}


@app.get("/api/items")
async def get_items():
    return [{"id": 1, "name": "Nixpacks Item"}]
