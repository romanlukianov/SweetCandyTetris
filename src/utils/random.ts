export function getRandomCandyId(): number {
    const random = Math.random();

    if (random < 0.6) return 1;  
    if (random < 0.9) return 2;  
    return 3;                    
}
