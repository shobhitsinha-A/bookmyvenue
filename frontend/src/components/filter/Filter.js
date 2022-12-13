import React, {useState, useEffect} from "react";
import { FormLabel, FormControl, FormGroup, FormControlLabel, Checkbox, Rating, RadioGroup, Radio } from '@mui/material';
import { RangeSlider } from 'rsuite';

export default (props) => {
    const [cities, setCities] = useState([]);
    const [states, setStates] = useState([]);
    const [ratings, setRatings] = useState('0');
    const [priceRange, setPriceRange] = useState([0, 0]);
    const [capacityRange, setCapacityRange] = useState([0, 0]);
    const [filterParams, setFilterParams] = useState({
        cities: [],
        states: [],
        min_price: 0,
        max_price: 0,
        min_capacity: 0,
        max_capacity: 0
    });
    useEffect(() => {
        async function getFilterMetadata() {
            let response = await fetch('https://bookmyvenue.live:6969/venues/filter', {
                method: 'GET'
            });
            let jsonResponse = await response.json();
            if (jsonResponse.status) {
                setFilterParams(jsonResponse.data.details);
                sessionStorage.setItem('filterParams', '{}');
            }
        }
        getFilterMetadata().catch(console.error);
    }, []);
    function getAndSetFilterParams() {
        let filterParams = JSON.parse(sessionStorage.getItem('filterParams'));
        if (cities.length > 0) filterParams['cities'] = cities;
        if (states.length > 0) filterParams['states'] = states;
        if (priceRange[0] !== 0 && priceRange[1] === 0) filterParams['price'] = {'low': priceRange[0], 'high': filterParams.max_price};
        if (priceRange[0] === 0 && priceRange[1] !== 0) filterParams['price'] = {'low': filterParams.min_price, 'high': priceRange[1]};
        if (priceRange[0] !== 0 && priceRange[1] !== 0) filterParams['price'] = {'low': priceRange[0], 'high': priceRange[1]};
        if (capacityRange[0] !== 0 && capacityRange[1] === 0) filterParams['capacity'] = {'low': capacityRange[0], 'high': filterParams.max_capacity};
        if (capacityRange[0] === 0 && capacityRange[1] !== 0) filterParams['capacity'] = {'low': filterParams.min_capacity, 'high': capacityRange[1]};
        if (capacityRange[0] !== 0 && capacityRange[1] !== 0) filterParams['capacity'] = {'low': capacityRange[0], 'high': capacityRange[1]};
        if (ratings !== '0') filterParams['rating']['low'] = parseInt(ratings);
        if (ratings !== '0') filterParams['rating']['high'] = 5;
        sessionStorage.setItem('filterParams', JSON.stringify(filterParams));
    }
    const handleCityUpdates = (event) => {
        event.target.checked ? setCities(cities.concat(event.target.name)) : setCities(cities.filter(city => city !== event.target.name));
        getAndSetFilterParams();
    };
    const handleStateUpdates = (event) => {
        event.target.checked ? setStates(states.concat(event.target.name)) : setStates(states.filter(state => state !== event.target.name));
        getAndSetFilterParams();
    };
    const handleRatingUpdates = (event) => {
        setRatings(event.target.value);
        getAndSetFilterParams();
    }
    const handlePriceRangeUpdates = (event) => {
        setPriceRange(event);
        getAndSetFilterParams();
    }
    const handleCapacityRangeUpdates = (event) => {
        setCapacityRange(event);
        getAndSetFilterParams();
    }
    function isCityChecked(city) {
        return cities.includes(city);
    }
    function isStateChecked(state) {
        return states.includes(state);
    }
    function calculateStep(min, max) {
        return Math.floor((max - min) / 10);
    }

    return (
        <div className="relative mb-6">
            <div className="px-4 md:px-10 mx-auto w-full">
                <div>
                    <div className="flex flex-wrap">
                        <div className="w-full lg:w-3/12 px-4">
                            <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                                <FormLabel component="legend">City</FormLabel>
                                <FormGroup>
                                    {filterParams.cities.map(city => {
                                        return (
                                            <FormControlLabel
                                                control={
                                                    <Checkbox checked={isCityChecked(city)} onChange={handleCityUpdates} name={city} />
                                                }
                                                label={city}
                                            />
                                        );
                                    })}
                                </FormGroup>
                            </FormControl>
                        </div>
                        <div className="w-full lg:w-3/12 px-4">
                            <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                                <FormLabel component="legend">State</FormLabel>
                                <FormGroup>
                                    {filterParams.states.map(state => {
                                        return (
                                            <FormControlLabel
                                                control={
                                                    <Checkbox checked={isStateChecked(state)} onChange={handleStateUpdates} name={state} />
                                                }
                                                label={state}
                                            />
                                        );
                                    })}
                                </FormGroup>
                            </FormControl>
                        </div>
                        <div className="w-full lg:w-3/12">
                            <div className="flex flex-col">
                                <div className="flex flex-col">
                                    <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                                        <FormLabel component="legend">Price</FormLabel>
                                        <FormGroup>
                                            <div className="flex flex-row justify-content-between mt-4">
                                                {filterParams.min_price} &nbsp;
                                                <div className="min-w-140-px w-auto">
                                                    <RangeSlider value={priceRange} onChange={handlePriceRangeUpdates} min={filterParams.min_price} max={filterParams.max_price} step={calculateStep(filterParams.min_price, filterParams.max_price)} />
                                                </div>
                                                &nbsp; {filterParams.max_price}
                                            </div>
                                        </FormGroup>
                                    </FormControl>

                                </div>
                                <div className="flex flex-col">
                                    <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                                        <FormLabel component="legend">Capacity</FormLabel>
                                        <FormGroup>
                                            <div className="flex flex-row justify-content-between mt-4">
                                                {filterParams.min_capacity} &nbsp;
                                                <div className="min-w-140-px w-auto">
                                                    <RangeSlider value={capacityRange} onChange={handleCapacityRangeUpdates} min={filterParams.min_capacity} max={filterParams.max_capacity} step={calculateStep(filterParams.min_capacity, filterParams.max_capacity)} />
                                                </div>
                                                &nbsp; {filterParams.max_capacity}
                                            </div>
                                        </FormGroup>
                                    </FormControl>
                                </div>
                            </div>
                        </div>
                        <div className="w-full lg:w-3/12 px-4">
                            <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                                <FormLabel component="legend">Rating</FormLabel>
                                <RadioGroup
                                    value={ratings}
                                    onChange={handleRatingUpdates}
                                >
                                <FormControlLabel
                                    control={
                                        <div>
                                            <Radio value={'4'} />
                                            <Rating value={4} readOnly />
                                        </div>
                                    }
                                    label="&nbsp; & up"
                                />
                                <FormControlLabel
                                    control={
                                        <div>
                                            <Radio value={'3'} />
                                            <Rating value={3} readOnly />
                                        </div>
                                    }
                                    label="&nbsp; & up"
                                />
                                <FormControlLabel
                                    control={
                                        <div>
                                            <Radio value={'2'} />
                                            <Rating value={2} readOnly />
                                        </div>
                                    }
                                    label="&nbsp; & up"
                                />
                                <FormControlLabel
                                    control={
                                        <div>
                                            <Radio value={'1'} />
                                            <Rating value={1} readOnly />
                                        </div>
                                    }
                                    label="&nbsp; & up"
                                />
                                </RadioGroup>
                            </FormControl>
                        </div>
                    </div>
                    <div className="flex justify-content-end">
                        <button
                            className="bg-purple-500 text-white active:bg-purple-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={props.search}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}