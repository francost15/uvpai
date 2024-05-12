
export const createThreadUseCaseC = async (): Promise<string> => {
  
    try {
      
      const resp = await fetch(`${ import.meta.env.VITE_ASSISTANT_API_C}/create-thread`,{
        method: 'POST'
      });
  
      const { id } = await resp.json() as { id: string };
  
      return id;
  
    } catch (error) {
  
      throw new Error('Error creating thread');
    }
  
  
  }