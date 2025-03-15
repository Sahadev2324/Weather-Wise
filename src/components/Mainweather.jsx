import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import CloudIcon from '@mui/icons-material/Cloud';

const MainWeatherCard = ({ weatherData }) => {

  const temperatureCelsius = weatherData?.main?.temp || "N/A";
  const weatherDescription = weatherData?.weather?.[0]?.description || "N/A";
  const cityName = weatherData?.name || "City not available";
  const countryName = weatherData?.sys?.country || "Country not available";
  const timestamp = weatherData?.dt || null;

  const currentDate = timestamp
    ? new Date(timestamp * 1000).toLocaleDateString('en-US', {
        weekday: 'long',
        day: 'numeric',
        month: 'short',
      })
    : "Date not available";

    const renderTemperatureIcon = () => {
      if (temperatureCelsius > 31) {
        return <WbSunnyIcon style={{ marginLeft: '10px', fontSize: '3rem', color: 'orange' }} />;
      } else if (temperatureCelsius < 10) {
        return <AcUnitIcon style={{ marginLeft: '10px', fontSize: '3rem', color: 'blue' }} />;
      } else {
        return <CloudIcon style={{ marginLeft: '10px', fontSize: '3rem', color: 'gray' }} />;
      }
    };

    return (
      <div style={{ backgroundColor: "rgba(233,116,81,0.4)", color: 'white', borderRadius: '0.5rem',width:'160px',padding:'30px', marginLeft:'3px', marginRight:'15px', boxShadow:'0px 0px 15px 2px black'}}>
        <div style={{fontSize:'20px'}}>Now</div>
      <div style={{display: 'flex', alignItems: 'center', fontSize: '35px', fontWeight: 'bold'  }}>
        {temperatureCelsius}°c
        {renderTemperatureIcon()}
        
        </div>
      <div style={{ fontSize: '15px', marginTop: '8px',fontWeight:'50' }}>  {weatherDescription}</div>
      <div style={{ marginTop: '1rem' }}>
      <div style={{display:'flex',alignItems:'center'}}>
       <CalendarMonthIcon/> 
        {currentDate}</div>
      <div style={{marginTop:'4px',display:'flex',alignItems:'center'}}>
      <LocationOnIcon/>
        {cityName}, {countryName}</div>
      </div>
      </div>
    );
  };
  
  export default MainWeatherCard;
  