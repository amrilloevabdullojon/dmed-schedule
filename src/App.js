import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import { FaMapMarkerAlt, FaBuilding, FaUniversity } from 'react-icons/fa';
import './style.css';
const App = () => {
    const [regions, setRegions] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [institutions, setInstitutions] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedInstitution, setSelectedInstitution] = useState('');
    const [tableData, setTableData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

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

        const interval = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (selectedRegion) {
            const regionDistricts = tableData
                .filter(row => row.region === selectedRegion)
                .map(row => row.district);

            const uniqueDistricts = [...new Set(regionDistricts)];
            setDistricts(uniqueDistricts);
        } else {
            setDistricts([]);
        }
        setSelectedDistrict('');
        setInstitutions([]);
    }, [selectedRegion, tableData]);

    useEffect(() => {
        if (selectedDistrict) {
            const districtInstitutions = tableData
                .filter(row => row.region === selectedRegion && row.district === selectedDistrict)
                .map(row => row.institution);

            const uniqueInstitutions = [...new Set(districtInstitutions)];
            setInstitutions(uniqueInstitutions);
        } else {
            setInstitutions([]);
        }
        setSelectedInstitution('');
    }, [selectedDistrict, selectedRegion, tableData]);

    useEffect(() => {
        if (selectedRegion && selectedDistrict && selectedInstitution) {
            const result = tableData.filter(
                (row) =>
                    row.region === selectedRegion &&
                    row.district === selectedDistrict &&
                    row.institution === selectedInstitution
            );
            setFilteredData([]);
            setTimeout(() => setFilteredData(result), 200);
        } else {
            setFilteredData([]);
        }
    }, [selectedRegion, selectedDistrict, selectedInstitution, tableData]);

    return (
        <div className="font-sans bg-gradient-to-r from-blue-100 to-blue-50 min-h-screen flex flex-col relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 animate-gradient-background"></div>
            <header className="bg-gradient-to-r from-blue-800 via-blue-600 to-blue-800 text-white py-8 shadow-lg relative z-10">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <h1 className="text-4xl font-bold">🎄 График обучения сотрудников 🎄</h1>
                    <div className="text-xl">Текущее время: {currentTime}</div>
                </div>
            </header>
            <main className="container mx-auto px-6 py-8 flex-grow relative z-10">
                <div className="bg-white shadow-2xl rounded-lg p-8 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                        <div>
                            <label htmlFor="region" className="block font-semibold text-gray-800 mb-2">
                                <FaMapMarkerAlt className="inline-block mr-2" /> Регион:
                            </label>
                            <select
                                id="region"
                                value={selectedRegion}
                                onChange={(e) => setSelectedRegion(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                            >
                                <option value="">Выберите регион</option>
                                {regions.map((region, index) => (
                                    <option key={index} value={region}>{region}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="district" className="block font-semibold text-gray-800 mb-2">
                                <FaBuilding className="inline-block mr-2" /> Район:
                            </label>
                            <select
                                id="district"
                                value={selectedDistrict}
                                onChange={(e) => setSelectedDistrict(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                            >
                                <option value="">Выберите район</option>
                                {districts.map((district, index) => (
                                    <option key={index} value={district}>{district}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="institution" className="block font-semibold text-gray-800 mb-2">
                                <FaUniversity className="inline-block mr-2" /> Учреждение:
                            </label>
                            <select
                                id="institution"
                                value={selectedInstitution}
                                onChange={(e) => setSelectedInstitution(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                            >
                                <option value="">Выберите учреждение</option>
                                {institutions.map((institution, index) => (
                                    <option key={index} value={institution}>{institution}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <table className="w-full bg-white shadow-xl rounded-lg overflow-hidden relative z-10">
                    <thead className="bg-blue-700 text-white">
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
                        {filteredData.map((row, index) => (
                            <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : "bg-white transition duration-300 hover:bg-blue-50"}>
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
            </main>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 animate-gradient-background"></div>
            <footer className="bg-gradient-to-r from-blue-800 to-blue-700 text-white py-6 mt-auto relative z-10">
                <div className="container mx-auto px-4 text-center">
                    &copy; 2024 График обучения сотрудников | Все права защищены
                </div>
            </footer>
        </div>
    );
};

export default App;
