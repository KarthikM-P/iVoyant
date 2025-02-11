import { useEffect, useState } from 'react';
import './Countrystyle.css';
interface CountryDetailProps {
    countryCode: string;
    onClose: () => void;
}

interface CountryDetailData {
    name: {
        common: string;
        official: string;
    };
    flags: {
        png: string;
    };
    region: string;
    subregion: string;
    population: number;
    capital: string[];
    languages: { [key: string]: string };
    currencies: { [key: string]: { name: string; symbol: string } };
}

const CountryDetail = ({ countryCode, onClose }: CountryDetailProps) => {

    const [country, setCountry] = useState<CountryDetailData | null> (null);

    useEffect(() => {
       
        fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`)
            .then((res) => res.json())
            .then((data) => setCountry(data[0]));
    }, [countryCode]);

    if (!country) {
        return <div>Loading...</div>;
    }

    return (
        <div className="country-detail">
            <button onClick={onClose}>Close</button>
            <h2>{country.name.common}</h2>
            <img src={country.flags.png}  />
            <p><strong>Official Name:</strong> {country.name.official}</p>
            <p><strong>Region:</strong> {country.region}</p>
            <p><strong>Subregion:</strong> {country.subregion}</p>
            <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
            <p><strong>Capital:</strong> {country.capital.join(', ')}</p>
            <p><strong>Languages:</strong> {Object.values(country.languages).join(', ')}</p>
            <p><strong>Currencies:</strong> {Object.values(country.currencies).map((currency) => `${currency.name} (${currency.symbol})`).join(', ')}</p>
        </div>
    );
};

export default CountryDetail;