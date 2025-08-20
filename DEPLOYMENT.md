# Deployment Guide

## Vercel Deployment Solution

### Problem
The original implementation used file-based persistence (`fs.writeFileSync`) which doesn't work in Vercel's serverless environment due to the read-only file system.

### Solution
Implemented a hybrid storage system that automatically adapts to the environment:

- **Development**: Uses file-based persistence (writes to `mock-data.json`)
- **Production/Serverless**: Uses in-memory storage (data persists during function execution)

### Storage Implementation

The storage system is implemented in `src/lib/utils/storage.ts` with two classes:

1. **FileStorage**: For development environments
   - Reads/writes to `src/lib/mock-data.json`
   - Provides persistent storage across server restarts

2. **MemoryStorage**: For serverless environments (Vercel)
   - Stores data in memory during function execution
   - Data resets on cold starts (function reinitialization)

### Environment Detection

The system automatically detects the environment:
```typescript
const isServerless = process.env.VERCEL === "1" || process.env.NODE_ENV === "production";
```

### API Behavior

- **GET requests**: Always return current data (from file or memory)
- **PATCH requests**: Update data in the appropriate storage system
- **Data consistency**: Maintains consistency within each request cycle

### Limitations

1. **Serverless Memory Storage**:
   - Data is lost on cold starts
   - Each function instance has its own memory space
   - Not suitable for long-term persistence

2. **No Cross-Instance Sharing**:
   - Updates in one function instance don't affect others
   - Each deployment creates fresh data

### Production Recommendations

For a production application, consider:

1. **Database Integration**:
   - Use PostgreSQL, MongoDB, or similar
   - Implement proper data persistence
   - Add connection pooling for serverless

2. **Caching Strategy**:
   - Implement Redis for session data
   - Use Vercel's Edge Cache for static data

3. **Data Backup**:
   - Regular backups of the `mock-data.json` file
   - Version control for data changes

### Current Implementation Benefits

- ✅ Works in both development and production
- ✅ No file system errors on Vercel
- ✅ Maintains API functionality
- ✅ Easy to understand and debug
- ✅ No external dependencies

### Deployment Steps

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy to Vercel**:
   ```bash
   vercel --prod
   ```

3. **Environment Variables** (if needed):
   - Set `NODE_ENV=production` in Vercel dashboard
   - Add any required API keys

### Testing

- **Local Development**: Test with `npm run dev`
- **Production**: Test deployed API endpoints
- **Cold Start**: Verify data resets after function timeout

### Monitoring

Monitor the following in production:
- Function execution times
- Cold start frequency
- Memory usage
- API response times
