import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import 'tailwindcss/tailwind.css';

const App = () => {
    const [regions, setRegions] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [institutions, setInstitutions] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedInstitution, setSelectedInstitution] = useState('');
    const [tableData, setTableData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
            const data = new Uint8Array(event.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(sheet);

            const formattedData = jsonData.map(row => ({
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
        };

        reader.readAsArrayBuffer(file);
    };

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
            setFilteredData(result);
        } else {
            setFilteredData([]);
        }
    }, [selectedRegion, selectedDistrict, selectedInstitution, tableData]);

    return (
        <div className="font-sans bg-gradient-to-r from-blue-100 to-blue-50 min-h-screen transition-all duration-500 ease-in-out">
            <header className="bg-blue-700 text-white py-6 shadow-md transition-all duration-500 ease-in-out hover:bg-blue-800">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-extrabold">График обучения сотрудников по системе DMED</h1>
                </div>
            </header>
            <main className="container mx-auto px-4 py-6">
                <div className="bg-white shadow-lg rounded-lg p-6 mb-6 transition-shadow duration-300 ease-in-out hover:shadow-xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div>
                            <label htmlFor="region" className="block font-medium text-gray-700 mb-2">Регион:</label>
                            <select
                                id="region"
                                value={selectedRegion}
                                onChange={(e) => setSelectedRegion(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
                            >
                                <option value="">Выберите регион</option>
                                {regions.map((region, index) => (
                                    <option key={index} value={region}>{region}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="district" className="block font-medium text-gray-700 mb-2">Район:</label>
                            <select
                                id="district"
                                value={selectedDistrict}
                                onChange={(e) => setSelectedDistrict(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
                            >
                                <option value="">Выберите район</option>
                                {districts.map((district, index) => (
                                    <option key={index} value={district}>{district}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="institution" className="block font-medium text-gray-700 mb-2">Учреждение:</label>
                            <select
                                id="institution"
                                value={selectedInstitution}
                                onChange={(e) => setSelectedInstitution(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
                            >
                                <option value="">Выберите учреждение</option>
                                {institutions.map((institution, index) => (
                                    <option key={index} value={institution}>{institution}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <input
                        type="file"
                        accept=".xlsx, .xls"
                        onChange={handleFileUpload}
                        className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
                    />
                </div>
                <table className="min-w-full bg-white shadow-lg rounded-lg transition-all duration-300 ease-in-out">
                    <thead className="bg-blue-700 text-white">
                        <tr>
                            <th className="py-3 px-4 text-left">Регион</th>
                            <th className="py-3 px-4 text-left">Район</th>
                            <th className="py-3 px-4 text-left">Учреждение</th>
                            <th className="py-3 px-4 text-left">Звено</th>
                            <th className="py-3 px-4 text-left">День</th>
                            <th className="py-3 px-4 text-left">Сеанс</th>
                            <th className="py-3 px-4 text-left">Ответственный</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((row, index) => (
                            <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : "bg-white transition-all duration-300 ease-in-out hover:bg-blue-50"}>
                                <td className="py-3 px-4">{row.region}</td>
                                <td className="py-3 px-4">{row.district}</td>
                                <td className="py-3 px-4">{row.institution}</td>
                                <td className="py-3 px-4">{row.level}</td>
                                <td className="py-3 px-4">{row.day}</td>
                                <td className="py-3 px-4">{row.session}</td>
                                <td className="py-3 px-4">{row.responsible}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
            <footer className="bg-blue-700 text-white py-4 transition-all duration-300 ease-in-out hover:bg-blue-800">
                <div className="container mx-auto px-4 text-center">
                    &copy; 2024 График обучения сотрудников по системе DMED | Все права защищены
                </div>
            </footer>
        </div>
    );
};

export default App;
