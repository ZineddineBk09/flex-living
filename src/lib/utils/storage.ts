import fs from "fs";
import path from "path";
import mockData from "@/lib/mock-data.json";

// In-memory storage for serverless environments
let inMemoryData: typeof mockData = JSON.parse(JSON.stringify(mockData));

// File path for development environment
const DATA_FILE_PATH = path.join(process.cwd(), "src/lib/mock-data.json");

// Check if we're in a serverless environment
const isServerless = process.env.VERCEL === "1" || process.env.NODE_ENV === "production";

export interface StorageInterface {
  getData(): typeof mockData;
  updateReview(reviewId: number, updates: Record<string, unknown>): void;
  saveData(): void;
}

class FileStorage implements StorageInterface {
  getData(): typeof mockData {
    try {
      return JSON.parse(fs.readFileSync(DATA_FILE_PATH, "utf8"));
    } catch (error) {
      console.warn("Could not read data file, using mock data:", error);
      return JSON.parse(JSON.stringify(mockData));
    }
  }

  updateReview(reviewId: number, updates: Record<string, unknown>): void {
    const currentData = this.getData();
    const reviewIndex = currentData.reviews.findIndex((r: { id: number }) => r.id === reviewId);
    
    if (reviewIndex !== -1) {
      currentData.reviews[reviewIndex] = { ...currentData.reviews[reviewIndex], ...updates };
      fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(currentData, null, 2));
    }
  }

  saveData(): void {
    // File storage automatically saves on each update
  }
}

class MemoryStorage implements StorageInterface {
  getData(): typeof mockData {
    return inMemoryData;
  }

  updateReview(reviewId: number, updates: Record<string, unknown>): void {
    const reviewIndex = inMemoryData.reviews.findIndex((r: { id: number }) => r.id === reviewId);
    
    if (reviewIndex !== -1) {
      inMemoryData.reviews[reviewIndex] = { ...inMemoryData.reviews[reviewIndex], ...updates };
    }
  }

  saveData(): void {
    // In-memory storage persists for the duration of the serverless function
    // Data will be reset when the function cold starts
    console.log("Data updated in memory (will reset on cold start)");
  }
}

// Export the appropriate storage implementation
export const storage: StorageInterface = isServerless ? new MemoryStorage() : new FileStorage();

// Helper function to reset in-memory data (useful for testing)
export const resetInMemoryData = () => {
  if (isServerless) {
    inMemoryData = JSON.parse(JSON.stringify(mockData));
  }
};
