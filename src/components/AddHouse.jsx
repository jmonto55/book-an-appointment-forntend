import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { createHouse } from '../redux/houses/housesSlice';

const AddHouse = () => {
  const dispatch = useDispatch();
  const initialFormData = [
    { name: 'name', value: '' },
    { name: 'address', value: '' },
    { name: 'description', value: '' },
    { name: 'city', value: '' },
    { name: 'photo', value: '' },
    { name: 'night_price', value: '' },
  ];
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const successMessageRef = useRef(null);

  const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => prevFormData.map((field) => (
      field.name === name ? { ...field, value } : field)));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const houseData = formData.reduce(
      (data, field) => ({ ...data, [field.name]: field.value }),
      {},
    );
    dispatch(createHouse(houseData));
    setFormData(initialFormData);
    setIsSubmitted(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (successMessageRef.current && !successMessageRef.current.contains(event.target)) {
        setIsSubmitted(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="p-8 h-screen" style={{ backgroundColor: '#96bf01' }}>
      <h2 className="font-black uppercase mx-auto text-center text-2xl text-white">ADD A NEW HOUSE</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-end container mx-auto border px-6 py-8 max-w-md mt-6 bg-gray-100 rounded-md"
      >
        {formData.map((field) => (
          <input
            key={field.name}
            type={field.name === 'night_price' ? 'number' : 'text'}
            name={field.name}
            placeholder={field.name === 'night_price' ? 'Price per Night' : capitalize(field.name)}
            value={field.value}
            onChange={handleChange}
            className="mt-2 w-full p-2 border border-slate-300 rounded text-sm shadow-sm
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            required
            minLength={field.name === 'name' || field.name === 'address' || field.name === 'city' ? 3 : undefined}
            maxLength={field.name === 'name' || field.name === 'city' ? 16 : undefined}
            min={field.name === 'night_price' ? 0 : undefined}
            step={field.name === 'night_price' ? 1 : undefined}
            pattern={field.name === 'night_price' ? '[0-9]*' : undefined}
          />
        ))}
        {isSubmitted && (
          <p ref={successMessageRef} className="text-green-500 mt-2">
            Successfully created!
          </p>
        )}
        <button
          type="submit"
          className="rounded-full bg-yellow-400 px-6 py-2 mt-4 color text-white font-bold w-min"
          style={{ backgroundColor: '#97BF0F' }}
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
};

export default AddHouse;
