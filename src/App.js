import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
    const [regions, setRegions] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [institutions, setInstitutions] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedInstitution, setSelectedInstitution] = useState('');
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        // Mock data loading
        setRegions(["город Ташкент", "Андижанская область"]);
    }, []);

    useEffect(() => {
        if (selectedRegion === "город Ташкент") {
            setDistricts(["Алмазарский район", "Бектемирский район"]);
        } else if (selectedRegion === "Андижанская область") {
            setDistricts(["Андижанский район", "Асакинский район"]);
        } else {
            setDistricts([]);
        }
        setSelectedDistrict('');
        setInstitutions([]);
    }, [selectedRegion]);

    useEffect(() => {
        if (selectedDistrict) {
            setInstitutions(["Центральная больница", "Школа №1"]);
        } else {
            setInstitutions([]);
        }
        setSelectedInstitution('');
    }, [selectedDistrict]);

    useEffect(() => {
        if (selectedInstitution) {
            setTableData([
                {
                    institution: "Центральная больница",
                    level: "Первичное звено",
                    day: "Понедельник",
                    session: "Утренний",
                    responsible: "Иванов И.И."
                }
            ]);
        } else {
            setTableData([]);
        }
    }, [selectedInstitution]);

    return (
        <div className="app">
            <header className="header">
                <img src="123.jpg" alt="Логотип DMED" className="logo" />
                <h1>График обучения сотрудников по системе DMED</h1>
            </header>
            <div className="container">
                <div className="filter-section">
                    <div>
                        <label htmlFor="region">Регион:</label>
                        <select
                            id="region"
                            value={selectedRegion}
                            onChange={(e) => setSelectedRegion(e.target.value)}
                        >
                            <option value="">Выберите регион</option>
                            {regions.map((region, index) => (
                                <option key={index} value={region}>{region}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="district">Район:</label>
                        <select
                            id="district"
                            value={selectedDistrict}
                            onChange={(e) => setSelectedDistrict(e.target.value)}
                        >
                            <option value="">Выберите район</option>
                            {districts.map((district, index) => (
                                <option key={index} value={district}>{district}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="institution">Учреждение:</label>
                        <select
                            id="institution"
                            value={selectedInstitution}
                            onChange={(e) => setSelectedInstitution(e.target.value)}
                        >
                            <option value="">Выберите учреждение</option>
                            {institutions.map((institution, index) => (
                                <option key={index} value={institution}>{institution}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <table className="schedule-table">
                    <thead>
                        <tr>
                            <th>Учреждение</th>
                            <th>Звено</th>
                            <th>День</th>
                            <th>Сеанс</th>
                            <th>Ответственный</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((row, index) => (
                            <tr key={index}>
                                <td>{row.institution}</td>
                                <td>{row.level}</td>
                                <td>{row.day}</td>
                                <td>{row.session}</td>
                                <td>{row.responsible}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <footer className="footer">
                &copy; 2024 График обучения сотрудников по системе DMED | Все права защищены
            </footer>
        </div>
    );
};

export default App;
