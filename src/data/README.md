# Dummy Data Mechanism

This directory contains the dummy data system for the workout app, which automatically populates the app with sample exercises and workout plans when the local state is empty.

## Files

### `dummyData.json`
Contains the dummy exercises and workout plans data in JSON format:
- **24 exercises** across different categories (Chest, Legs, Arms, Core, Back, Shoulders, Full Body)
- **5 workout plans** with different focuses (Upper Body, Lower Body, Core & Cardio, HIIT, Beginner)

### Data Structure
```json
{
  "exercises": [
    {
      "id": "ex1",
      "name": "Push Ups",
      "category": "Chest",
      "syncStatus": "synced"
    }
  ],
  "workoutPlans": [
    {
      "id": "wp1",
      "name": "Upper Body Strength",
      "description": "Focus on chest, back, shoulders, and arms",
      "exercises": [
        {
          "id": "ex1",
          "name": "Push Ups",
          "category": "Chest",
          "syncStatus": "synced",
          "sets": 3,
          "reps": 15
        }
      ],
      "syncStatus": "synced"
    }
  ]
}
```

## How It Works

1. **Automatic Loading**: When the app starts, the `useDummyDataLoader` hook checks if both exercises and workout plans are empty
2. **Conditional Population**: If the state is empty, it automatically loads the dummy data from `dummyData.json`
3. **Persistence Friendly**: Works with Redux Persist - only loads when truly needed
4. **Development Ready**: Includes console logging for debugging

## Usage

### Automatic (Recommended)
The dummy data loads automatically when:
- App starts for the first time
- Local storage is cleared
- Both exercises and workout plans are empty

### Manual Loading
For development or testing purposes:
```typescript
import { useManualDummyDataLoader } from '@/hooks/useDummyDataLoader';

const { loadDummyData } = useManualDummyDataLoader();
// Call loadDummyData() when needed
```

## Benefits

- **Better UX**: Users see content immediately instead of empty lists
- **Development Friendly**: Developers have sample data to work with
- **Persistence Compatible**: Doesn't interfere with Redux Persist
- **Flexible**: Can be easily modified or extended
- **Performance**: Only loads when needed, minimal overhead

## Customization

To modify the dummy data:
1. Edit `dummyData.json` with your desired exercises and workout plans
2. Ensure the structure matches the TypeScript interfaces in `@/types`
3. The changes will be automatically picked up on next app restart (when state is empty)