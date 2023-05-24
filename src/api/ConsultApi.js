export default async function getCurrentWeather(location) {
    const key = 'a3716f3bb1655185feee051b1e9ea397';
    const lat = location.latitude;
    const lon = location.longitude;
  
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}&lang=pt_br`);
      const result = await response.json();
      //  console.log(result);
  
      // Faça algo com o resultado, como retorná-lo ou armazená-lo no estado do componente
  
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  