export const detectJSONChanges = (prev: any, curr: any) => 
    JSON.stringify(prev) === JSON.stringify(curr);