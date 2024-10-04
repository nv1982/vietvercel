const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000; // Sử dụng cổng 3000

// Middleware
app.use(bodyParser.json());

let employees = [
    { id: 1, name: 'John Doe', position: 'Developer' },
    { id: 2, name: 'Jane Smith', position: 'Designer' },
];

// Đường dẫn gốc
app.get('/', (req, res) => {
    res.send('Hello, Vercel! This is a simple app with employee management.');
});

// Lấy danh sách nhân viên
app.get('/api/employees', (req, res) => {
    res.json(employees);
});

// Thêm nhân viên
app.post('/api/employees', (req, res) => {
    const newEmployee = req.body;
    if (!newEmployee.name || !newEmployee.position) {
        return res.status(400).json({ message: 'Name and position are required' });
    }
    newEmployee.id = employees.length + 1; // Tự động tăng ID
    employees.push(newEmployee);
    res.status(201).json(newEmployee);
});

// Xóa nhân viên
app.delete('/api/employees/:id', (req, res) => {
    const employeeId = parseInt(req.params.id);
    const index = employees.findIndex(emp => emp.id === employeeId);
    
    if (index === -1) {
        return res.status(404).json({ message: 'Employee not found' });
    }
    
    employees.splice(index, 1); // Xóa nhân viên
    res.status(204).send(); // Trả về mã 204 No Content
});

// Bắt đầu server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
