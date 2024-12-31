import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import { FaMapMarkerAlt, FaBuilding, FaUniversity } from 'react-icons/fa';

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
        <div className="font-sans bg-gradient-to-r from-gray-100 to-gray-50 min-h-screen flex flex-col">
            <header className="bg-gradient-to-r from-gray-800 to-gray-700 text-white py-6 shadow-lg">
                <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-center">График обучения сотрудников</h1>
                    <div className="text-lg md:text-xl mt-2 md:mt-0">Текущее время: {currentTime}</div>
                </div>
            </header>
            <main className="container mx-auto px-4 md:px-6 py-8 flex-grow">
                <div className="bg-white shadow-2xl rounded-lg p-6 md:p-8 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-6">
                        <div>
                            <label htmlFor="region" className="block font-semibold text-gray-800 mb-2">
                                <FaMapMarkerAlt className="inline-block mr-2" /> Регион:
                            </label>
                            <select
                                id="region"
                                value={selectedRegion}
                                onChange={(e) => setSelectedRegion(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-300"
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
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-300"
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
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-300"
                            >
                                <option value="">Выберите учреждение</option>
                                {institutions.map((institution, index) => (
                                    <option key={index} value={institution}>{institution}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-xl rounded-lg">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="py-4 px-6 text-left text-sm md:text-base">Регион</th>
                                <th className="py-4 px-6 text-left text-sm md:text-base">Район</th>
                                <th className="py-4 px-6 text-left text-sm md:text-base">Учреждение</th>
                                <th className="py-4 px-6 text-left text-sm md:text-base">Звено</th>
                                <th className="py-4 px-6 text-left text-sm md:text-base">День</th>
                                <th className="py-4 px-6 text-left text-sm md:text-base">Сеанс</th>
                                <th className="py-4 px-6 text-left text-sm md:text-base">Ответственный</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((row, index) => (
                                <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : "bg-white transition duration-300 hover:bg-gray-50"}>
                                    <td className="py-4 px-6 text-sm md:text-base">{row.region}</td>
                                    <td className="py-4 px-6 text-sm md:text-base">{row.district}</td>
                                    <td className="py-4 px-6 text-sm md:text-base">{row.institution}</td>
                                    <td className="py-4 px-6 text-sm md:text-base">{row.level}</td>
                                    <td className="py-4 px-6 text-sm md:text-base">{row.day}</td>
                                    <td className="py-4 px-6 text-sm md:text-base">{row.session}</td>
                                    <td className="py-4 px-6 text-sm md:text-base">{row.responsible}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
            <footer className="bg-gradient-to-r from-gray-800 to-gray-700 text-white py-6 mt-auto">
                <div className="container mx-auto px-4 text-center">
                    &copy; 2024 График обучения сотрудников | Все права защищены
                </div>
            </footer>
        </div>
    );
};

export default App;
