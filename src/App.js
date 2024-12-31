import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import { FaMapMarkerAlt, FaBuilding, FaUniversity } from 'react-icons/fa';
import logo from './assets/logo.png';

const App = () => {
    const [regions, setRegions] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [institutions, setInstitutions] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedInstitution, setSelectedInstitution] = useState('');
    const [tableData, setTableData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const itemsPerPage = 5;

    const staticData = [
        { region: "город Ташкент", district: "Алмазарский район", institution: "Центральная больница", level: "Первичное звено", day: "Понедельник", session: "Утренний", responsible: "Иванов И.И." },
        { region: "город Ташкент", district: "Юнусабадский район", institution: "Школа №1", level: "Школьное звено", day: "Вторник", session: "Дневной", responsible: "Петров П.П." },
        { region: "Андижанская область", district: "Андижанский район", institution: "Поликлиника №7", level: "Вторичное звено", day: "Среда", session: "Вечерний", responsible: "Сидоров С.С." },
        { region: "Бухарская область", district: "Бухарский район", institution: "Гимназия №3", level: "Школьное звено", day: "Четверг", session: "Утренний", responsible: "Кузнецов К.К." },
        { region: "Джизакская область", district: "Зарбдорский район", institution: "Университет №2", level: "Высшее образование", day: "Пятница", session: "Дневной", responsible: "Михайлов М.М." },
        { region: "Самаркандская область", district: "Самаркандский район", institution: "Центр здоровья", level: "Первичное звено", day: "Суббота", session: "Вечерний", responsible: "Фёдоров Ф.Ф." }
    ];

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
    }, [selectedDistrict, selectedRegion, tableData]);

    useEffect(() => {
        let filtered = tableData;

        if (selectedRegion) {
            filtered = filtered.filter(row => row.region === selectedRegion);
        }

        if (selectedDistrict) {
            filtered = filtered.filter(row => row.district === selectedDistrict);
        }

        if (selectedInstitution) {
            filtered = filtered.filter(row => row.institution === selectedInstitution);
        }

        setFilteredData(filtered);
    }, [selectedRegion, selectedDistrict, selectedInstitution, tableData]);

    const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    return (
        <div className={`font-sans ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'} min-h-screen flex flex-col`}>
            <header className={isDarkMode ? "bg-gray-800 text-white py-6 shadow-lg" : "bg-blue-600 text-white py-6 shadow-lg"}>
                <div className="container mx-auto px-4 flex flex-col items-center">
                    <img src={logo} alt="Логотип" className="h-16 mb-4" />
                    <h1 className="text-3xl md:text-4xl font-bold text-center">График обучения сотрудников DMED</h1>
                    <button
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        className="mt-4 px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 focus:outline-none"
                    >
                        {isDarkMode ? 'Светлая тема' : 'Тёмная тема'}
                    </button>
                </div>
            </header>
            <main className="container mx-auto px-4 md:px-6 py-8 flex-grow">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div>
                        <label htmlFor="region" className="block font-semibold mb-2">
                            <FaMapMarkerAlt className="inline-block mr-2" /> Регион:
                        </label>
                        <select
                            id="region"
                            value={selectedRegion}
                            onChange={(e) => setSelectedRegion(e.target.value)}
                            className={`w-full px-4 py-3 border ${isDarkMode ? 'border-gray-700 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
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
                            className={`w-full px-4 py-3 border ${isDarkMode ? 'border-gray-700 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
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
                            className={`w-full px-4 py-3 border ${isDarkMode ? 'border-gray-700 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        >
                            <option value="">Выберите учреждение</option>
                            {institutions.map((institution, index) => (
                                <option key={index} value={institution}>{institution}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="md:hidden">
                    {paginatedData.map((row, index) => (
                        <div key={index} className="mb-4 p-4 border rounded-lg shadow-md bg-white text-gray-900">
                            <p><strong>Регион:</strong> {row.region}</p>
                            <p><strong>Район:</strong> {row.district}</p>
                            <p><strong>Учреждение:</strong> {row.institution}</p>
                            <p><strong>Звено:</strong> {row.level}</p>
                            <p><strong>День:</strong> {row.day}</p>
                            <p><strong>Сеанс:</strong> {row.session}</p>
                            <p><strong>Ответственный:</strong> {row.responsible}</p>
                        </div>
                    ))}
                </div>
                <div className="hidden md:block overflow-x-auto">
                    <table className={`min-w-full ${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'} shadow-xl rounded-lg`}>
                        <thead className={isDarkMode ? "bg-gray-700 text-white" : "bg-blue-600 text-white"}>
                            <tr>
                                <th className="py-4 px-6 text-left">Регион</th>
                                <th className="py-4 px-6 text-left">Район</th>
                                <th className="py-4 px-6 text-left">Учреждение</th>
                                <th className="py-4 px-6 text-left">Звено</th>
                                <th className="py-4 px-6 text-left">День</th>
                                <th className="py-4 px-6 text-left">Сеанс</th>
                                <th className="py-4 px-6 text-left">Ответственный</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.map((row, index) => (
                                <tr key={index} className={`${index % 2 === 0 ? (isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-blue-50') : (isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-blue-100')} transition duration-300`}>
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
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        className={`px-4 py-2 ${isDarkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-blue-700 text-white hover:bg-blue-600'} rounded-lg`}
                    >
                        Назад
                    </button>
                    <span>Страница {currentPage} из {totalPages}</span>
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        className={`px-4 py-2 ${isDarkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-blue-700 text-white hover:bg-blue-600'} rounded-lg`}
                    >
                        Вперед
                    </button>
                </div>
            </main>
            <footer className={isDarkMode ? "bg-gray-900 text-gray-400 py-6" : "bg-blue-600 text-white py-6"}>
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
