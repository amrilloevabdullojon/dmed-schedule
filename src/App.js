import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import { FaMapMarkerAlt, FaBuilding, FaUniversity, FaSearch, FaSun, FaMoon, FaRedo } from 'react-icons/fa';
import logo from './assets/logo.png';
import staticData from './part_1.json';

const App = () => {
    const [regions, setRegions] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [institutions, setInstitutions] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState(localStorage.getItem('selectedRegion') || '');
    const [selectedDistrict, setSelectedDistrict] = useState(localStorage.getItem('selectedDistrict') || '');
    const [selectedInstitution, setSelectedInstitution] = useState(localStorage.getItem('selectedInstitution') || '');
    const [searchInstitution, setSearchInstitution] = useState('');
    const [tableData, setTableData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isDarkMode, setIsDarkMode] = useState(JSON.parse(localStorage.getItem('isDarkMode')) || false);
    const itemsPerPage = 5;

    useEffect(() => {
        const formattedData = staticData.map(row => ({
            region: row.region || '-',
            district: row.district || '-',
            institution: row.institution || '-',
            level: row.level || '-',
            day: row.day || '-',
            session: row.session || '-',
            responsible: row.responsible || '-'
        }));

        setTableData(formattedData);

        const uniqueRegions = [...new Set(formattedData.map(row => row.region))];
        setRegions(uniqueRegions);
    }, []);

    useEffect(() => {
        if (selectedRegion) {
            const regionDistricts = tableData
                .filter(row => row.region === selectedRegion)
                .map(row => row.district);
            setDistricts([...new Set(regionDistricts)]);
            setSelectedDistrict('');
            setInstitutions([]);
        } else {
            setDistricts([]);
            setInstitutions([]);
        }
        localStorage.setItem('selectedRegion', selectedRegion);
    }, [selectedRegion, tableData]);

    useEffect(() => {
        if (selectedDistrict) {
            const districtInstitutions = tableData
                .filter(row => row.region === selectedRegion && row.district === selectedDistrict)
                .map(row => row.institution);
            setInstitutions([...new Set(districtInstitutions)]);
            setSelectedInstitution('');
        } else {
            setInstitutions([]);
        }
        localStorage.setItem('selectedDistrict', selectedDistrict);
    }, [selectedDistrict, selectedRegion, tableData]);

    useEffect(() => {
        localStorage.setItem('selectedInstitution', selectedInstitution);
    }, [selectedInstitution]);

    useEffect(() => {
        const filtered = tableData.filter(row => {
            return (
                (!selectedRegion || row.region === selectedRegion) &&
                (!selectedDistrict || row.district === selectedDistrict) &&
                (!selectedInstitution || row.institution === selectedInstitution) &&
                (!searchInstitution || row.institution.toLowerCase().includes(searchInstitution.toLowerCase()))
            );
        });
        setFilteredData(filtered);
        setCurrentPage(1);
    }, [selectedRegion, selectedDistrict, selectedInstitution, searchInstitution, tableData]);

    const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const toggleTheme = () => {
        const newTheme = !isDarkMode;
        setIsDarkMode(newTheme);
        localStorage.setItem('isDarkMode', JSON.stringify(newTheme));
    };

    const resetFilters = () => {
        setSelectedRegion('');
        setSelectedDistrict('');
        setSelectedInstitution('');
        setSearchInstitution('');
    };

    return (
        <div className={`font-sans ${isDarkMode ? 'bg-gradient-to-br from-gray-800 via-gray-900 to-black text-gray-100' : 'bg-gradient-to-br from-blue-100 via-white to-gray-50 text-gray-900'} min-h-screen flex flex-col transition-all duration-300`}>
            <header className={isDarkMode ? "bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-white py-6 shadow-lg transition-all duration-300" : "bg-gradient-to-r from-blue-500 to-blue-700 text-white py-6 shadow-lg transition-all duration-300"}>
                <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center justify-center md:justify-start">
                        <img src={logo} alt="Логотип" className="h-12 md:h-16 mr-4 shadow-md" />
                        <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight drop-shadow-lg text-center md:text-left">График обучения сотрудников DMED</h1>
                    </div>
                    <div className="mt-4 md:mt-0 flex justify-center md:justify-end space-x-4">
                        <button
                            onClick={toggleTheme}
                            className="px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 focus:outline-none shadow-lg transform hover:scale-105 transition-transform duration-300"
                        >
                            {isDarkMode ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-blue-300" />}
                        </button>
                        <button
                            onClick={resetFilters}
                            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-500 focus:outline-none shadow-lg transform hover:scale-105 transition-transform duration-300"
                        >
                            <FaRedo className="inline-block mr-2" /> Сбросить фильтры
                        </button>
                    </div>
                </div>
            </header>
            <main className="container mx-auto px-4 md:px-6 py-8 flex-grow transition-all duration-300">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                    <div>
                        <label htmlFor="region" className="block font-semibold mb-2">
                            <FaMapMarkerAlt className="inline-block mr-2" /> Регион:
                        </label>
                        <select
                            id="region"
                            value={selectedRegion}
                            onChange={(e) => setSelectedRegion(e.target.value)}
                            className={`w-full px-4 py-3 border ${isDarkMode ? 'border-gray-700 bg-gray-800 text-white focus:ring-blue-400' : 'border-gray-300 bg-white text-gray-900 focus:ring-blue-600'} rounded-lg shadow-md focus:outline-none focus:ring-2 transition-all duration-300`}
                        >
                            <option value="">Выберите регион</option>
                            {regions.map((region, index) => (
                                <option key={index} value={region}>{region}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="district" className="block font-semibold mb-2">
                            <FaBuilding className="inline-block mr-2" /> Район:
                        </label>
                        <select
                            id="district"
                            value={selectedDistrict}
                            onChange={(e) => setSelectedDistrict(e.target.value)}
                            className={`w-full px-4 py-3 border ${isDarkMode ? 'border-gray-700 bg-gray-800 text-white focus:ring-blue-400' : 'border-gray-300 bg-white text-gray-900 focus:ring-blue-600'} rounded-lg shadow-md focus:outline-none focus:ring-2 transition-all duration-300`}
                        >
                            <option value="">Выберите район</option>
                            {districts.map((district, index) => (
                                <option key={index} value={district}>{district}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="institution" className="block font-semibold mb-2">
                            <FaUniversity className="inline-block mr-2" /> Учреждение:
                        </label>
                        <select
                            id="institution"
                            value={selectedInstitution}
                            onChange={(e) => setSelectedInstitution(e.target.value)}
                            className={`w-full px-4 py-3 border ${isDarkMode ? 'border-gray-700 bg-gray-800 text-white focus:ring-blue-400' : 'border-gray-300 bg-white text-gray-900 focus:ring-blue-600'} rounded-lg shadow-md focus:outline-none focus:ring-2 transition-all duration-300`}
                        >
                            <option value="">Выберите учреждение</option>
                            {institutions.map((institution, index) => (
                                <option key={index} value={institution}>{institution}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="searchInstitution" className="block font-semibold mb-2">
                            <FaSearch className="inline-block mr-2" /> Поиск:
                        </label>
                        <input
                            type="text"
                            id="searchInstitution"
                            value={searchInstitution}
                            onChange={(e) => setSearchInstitution(e.target.value)}
                            placeholder="Введите название учреждения"
                            className={`w-full px-4 py-3 border ${isDarkMode ? 'border-gray-700 bg-gray-800 text-white focus:ring-blue-400' : 'border-gray-300 bg-white text-gray-900 focus:ring-blue-600'} rounded-lg shadow-md focus:outline-none focus:ring-2 transition-all duration-300`}
                        />
                    </div>
                </div>
                <div className="block md:hidden space-y-4">
                    {paginatedData.map((row, index) => (
                        <div
                            key={index}
                            className={`mb-4 p-4 border rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 ${isDarkMode ? 'bg-gray-800 text-gray-100 border-gray-700' : 'bg-white text-gray-900 border-gray-300'}`}
                        >
                            <p><strong>Регион:</strong> {row.region}</p>
                            <p><strong>Район:</strong> {row.district}</p>
                            <p><strong>Учреждение:</strong> {row.institution}</p>
                            <p><strong>Звено:</strong> {row.level}</p>
                            <p><strong>День:</strong> {row.day}</p>
                            <p><strong>Сессия:</strong> {row.session}</p>
                            <p><strong>Ответственный:</strong> {row.responsible}</p>
                        </div>
                    ))}
                </div>
                <div className="hidden md:block overflow-x-auto">
                    <table className={`min-w-full ${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'} shadow-xl rounded-lg transition-all duration-300 animate-fade-in`}>
                        <thead className={isDarkMode ? "bg-gray-700 text-white transition-all duration-300" : "bg-blue-600 text-white transition-all duration-300"}>
                            <tr>
                                <th className="py-4 px-6 text-left">Регион</th>
                                <th className="py-4 px-6 text-left">Район</th>
                                <th className="py-4 px-6 text-left">Учреждение</th>
                                <th className="py-4 px-6 text-left">Звено</th>
                                <th className="py-4 px-6 text-left">День</th>
                                <th className="py-4 px-6 text-left">Сессия</th>
                                <th className="py-4 px-6 text-left">Ответственный</th>
                            </tr>
                        </thead>
                        <tbody className="animate-fade-in">
                            {paginatedData.map((row, index) => (
                                <tr
                                    key={index}
                                    className={`transition duration-300 ${index % 2 === 0 ? (isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-blue-50') : (isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-blue-100')}`}
                                >
                                    <td className="py-4 px-6">{row.region}</td>
                                    <td className="py-4 px-6">{row.district}</td>
                                    <td className="py-4 px-6">{row.institution}</td>
                                    <td className="py-4 px-6">{row.level}</td>
                                    <td className="py-4 px-6">{row.day}</td>
                                    <td className="py-4 px-6">{row.session}</td>
                                    <td className="py-4 px-6">{row.responsible}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-between items-center mt-4">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        className={`px-4 py-2 ${isDarkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-blue-700 text-white hover:bg-blue-600'} rounded-lg`}
                    >
                        Назад
                    </button>
                    <span>Страница {currentPage} из {totalPages}</span>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        className={`px-4 py-2 ${isDarkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-blue-700 text-white hover:bg-blue-600'} rounded-lg`}
                    >
                        Вперед
                    </button>
                </div>
            </main>
            <footer className={isDarkMode ? "bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-gray-400 py-6" : "bg-gradient-to-r from-blue-500 to-blue-700 text-white py-6"}>
                <div className="container mx-auto px-4 text-center">
                    <p>Добро пожаловать на портал графика обучения сотрудников!</p>
                    <div className="mt-4">
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="mx-2 hover:text-gray-300">Facebook</a>
                        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="mx-2 hover:text-gray-300">Twitter</a>
                        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="mx-2 hover:text-gray-300">LinkedIn</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default App;

