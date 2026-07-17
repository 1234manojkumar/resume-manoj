var subjectCount = 0;
var savedSemesters = JSON.parse(localStorage.getItem('savedSemesters') || '[]');

function switchTab(tab) {
    document.querySelectorAll('.tab-content').forEach(function(el) { el.classList.remove('active'); });
    document.querySelectorAll('.tab').forEach(function(el) { el.classList.remove('active'); });
    document.getElementById(tab).classList.add('active');
    event.target.classList.add('active');
    document.getElementById('result').innerHTML = '';
    document.getElementById('final-result').innerHTML = '';
    if (tab === 'history') loadHistory();
    if (tab === 'calculator') renderSavedSemesters();
}

function toggleDark() {
    document.body.classList.toggle('dark');
}

function getGradePoint(gpa) {
    if (gpa >= 9.5) return { grade: 'O', class: 'grade-o' };
    if (gpa >= 8.5) return { grade: 'A+', class: 'grade-a' };
    if (gpa >= 7.5) return { grade: 'A', class: 'grade-a' };
    if (gpa >= 6.5) return { grade: 'B+', class: 'grade-b' };
    if (gpa >= 5.5) return { grade: 'B', class: 'grade-b' };
    if (gpa >= 4.5) return { grade: 'C', class: 'grade-c' };
    return { grade: 'F', class: 'grade-f' };
}

function getGradeFromPoint(gp) {
    if (gp >= 10) return { grade: 'O', class: 'grade-o' };
    if (gp >= 9) return { grade: 'A+', class: 'grade-a' };
    if (gp >= 8) return { grade: 'A', class: 'grade-a' };
    if (gp >= 7) return { grade: 'B+', class: 'grade-b' };
    if (gp >= 6) return { grade: 'B', class: 'grade-b' };
    if (gp >= 5) return { grade: 'C', class: 'grade-c' };
    return { grade: 'F', class: 'grade-f' };
}

function getOverallGrade(cgpa) {
    if (cgpa >= 9.0) return 'Outstanding';
    if (cgpa >= 8.0) return 'Excellent';
    if (cgpa >= 7.0) return 'Very Good';
    if (cgpa >= 6.0) return 'Good';
    if (cgpa >= 5.0) return 'Average';
    if (cgpa >= 4.0) return 'Below Average';
    return 'Fail';
}

function isFail(gp) {
    return gp < 5;
}

function addSubject(code, name, credit, gp) {
    subjectCount++;
    var tbody = document.getElementById('subject-body');
    var tr = document.createElement('tr');
    tr.id = 'row-' + subjectCount;
    var idx = subjectCount;
    var gradeInfo = gp ? getGradeFromPoint(gp) : { grade: '-', class: '' };
    tr.innerHTML =
        '<td>' + idx + '</td>' +
        '<td><input type="text" id="PCODE' + idx + '" placeholder="CS201" value="' + (code || '') + '"></td>' +
        '<td><input type="text" id="PNAME' + idx + '" placeholder="Subject Name" value="' + (name || '') + '"></td>' +
        '<td><input type="number" id="CRED' + idx + '" placeholder="4" min="1" max="10" step="1" value="' + (credit || '') + '" onchange="updateGradeDisplay(' + idx + ')"></td>' +
        '<td><input type="number" id="GP' + idx + '" placeholder="10" min="0" max="10" step="0.1" value="' + (gp || '') + '" onchange="updateGradeDisplay(' + idx + ')"></td>' +
        '<td><span class="grade-display ' + gradeInfo.class + '" id="GRD' + idx + '">' + gradeInfo.grade + '</span></td>' +
        '<td><button class="btn-del" onclick="removeSubject(' + idx + ')">X</button></td>';
    tbody.appendChild(tr);
}

function removeSubject(idx) {
    var row = document.getElementById('row-' + idx);
    if (row) row.remove();
    renumberRows();
}

function renumberRows() {
    var tbody = document.getElementById('subject-body');
    var rows = tbody.querySelectorAll('tr');
    rows.forEach(function(row, i) {
        row.querySelector('td:first-child').textContent = i + 1;
    });
}

function updateGradeDisplay(idx) {
    var gp = parseFloat(document.getElementById('GP' + idx).value);
    var gradeEl = document.getElementById('GRD' + idx);
    if (!isNaN(gp)) {
        var g = getGradeFromPoint(gp);
        gradeEl.textContent = g.grade;
        gradeEl.className = 'grade-display ' + g.class;
    } else {
        gradeEl.textContent = '-';
        gradeEl.className = 'grade-display';
    }
}

function getSubjects() {
    var subjects = [];
    var rows = document.getElementById('subject-body').querySelectorAll('tr');
    rows.forEach(function(row, i) {
        var idx = i + 1;
        var code = document.getElementById('PCODE' + idx);
        var name = document.getElementById('PNAME' + idx);
        var cred = document.getElementById('CRED' + idx);
        var gp = document.getElementById('GP' + idx);
        if (code && name && cred && gp) {
            var c = parseFloat(cred.value);
            var g = parseFloat(gp.value);
            if (!isNaN(c) && !isNaN(g)) {
                subjects.push({
                    code: code.value || '-',
                    name: name.value || '-',
                    credit: c,
                    gp: g
                });
            }
        }
    });
    return subjects;
}

function calculateSGPA() {
    var subjects = getSubjects();
    if (subjects.length === 0) {
        document.getElementById('result').innerHTML = '<p style="color:red;text-align:center;">Add at least one subject with credits and grade point.</p>';
        return;
    }
    var totalPoints = 0, totalCredits = 0, hasFail = false;
    var details = '';
    subjects.forEach(function(s) {
        totalPoints += s.gp * s.credit;
        totalCredits += s.credit;
        var g = getGradeFromPoint(s.gp);
        var failTag = isFail(s.gp) ? ' <span class="fail-tag">FAIL</span>' : '';
        details += '<div class="info-row"><span class="info-label">' + s.code + ' - ' + s.name + '</span><span class="info-value">' + s.gp.toFixed(1) + ' (' + g.grade + ')' + failTag + '</span></div>';
        if (isFail(s.gp)) hasFail = true;
    });
    var sgpa = totalPoints / totalCredits;
    var g = getGradeFromPoint(sgpa);
    var percent = ((sgpa - 0.5) * 10).toFixed(2);
    var overallGrade = getOverallGrade(sgpa);
    var status = hasFail ? '<span class="fail-tag">FAIL (has backlogs)</span>' : '<span class="pass-tag">PASS</span>';
    details += '<div class="info-row"><span class="info-label">Total Credits</span><span class="info-value">' + totalCredits + '</span></div>';
    details += '<div class="info-row"><span class="info-label">SGPA</span><span class="info-value">' + sgpa.toFixed(2) + ' (' + g.grade + ')</span></div>';
    details += '<div class="info-row"><span class="info-label">Percentage</span><span class="info-value percentage">' + percent + '%</span></div>';
    details += '<div class="info-row"><span class="info-label">Grade</span><span class="info-value grade">' + overallGrade + '</span></div>';
    details += '<div class="info-row"><span class="info-label">Status</span><span class="info-value">' + status + '</span></div>';
    document.getElementById('result').innerHTML = details;
}

function saveSemester() {
    var subjects = getSubjects();
    if (subjects.length === 0) {
        document.getElementById('result').innerHTML = '<p style="color:red;text-align:center;">Add at least one subject before saving.</p>';
        return;
    }
    var semVal = document.getElementById('stu_sem').value;
    if (!semVal) {
        document.getElementById('result').innerHTML = '<p style="color:red;text-align:center;">Select a semester first.</p>';
        return;
    }
    var totalPoints = 0, totalCredits = 0;
    subjects.forEach(function(s) {
        totalPoints += s.gp * s.credit;
        totalCredits += s.credit;
    });
    var sgpa = totalPoints / totalCredits;
    var semester = {
        sem: parseInt(semVal),
        sgpa: sgpa,
        totalCredits: totalCredits,
        subjects: subjects
    };
    var exists = -1;
    savedSemesters.forEach(function(s, i) {
        if (s.sem === semester.sem) exists = i;
    });
    if (exists >= 0) {
        savedSemesters[exists] = semester;
    } else {
        savedSemesters.push(semester);
    }
    savedSemesters.sort(function(a, b) { return a.sem - b.sem; });
    localStorage.setItem('savedSemesters', JSON.stringify(savedSemesters));
    renderSavedSemesters();
    document.getElementById('result').innerHTML = '<p style="color:green;text-align:center;">Semester ' + semVal + ' saved! SGPA: ' + sgpa.toFixed(2) + '</p>';
}

function renderSavedSemesters() {
    var container = document.getElementById('saved-sems');
    if (savedSemesters.length === 0) {
        container.innerHTML = '<p style="text-align:center;color:#999;font-size:13px;">No semesters saved yet.</p>';
        return;
    }
    var html = '';
    savedSemesters.forEach(function(s) {
        var g = getGradeFromPoint(s.sgpa);
        html += '<div class="saved-sem-card">';
        html += '<div class="sem-title">Semester ' + s.sem + ' — SGPA: ' + s.sgpa.toFixed(2) + ' (' + g.grade + ') | Credits: ' + s.totalCredits + '</div>';
        html += '<div class="sem-subjects">';
        s.subjects.forEach(function(sub) {
            var sg = getGradeFromPoint(sub.gp);
            var failMark = isFail(sub.gp) ? ' FAIL' : '';
            html += sub.code + ': ' + sub.gp.toFixed(1) + '(' + sg.grade + ')' + failMark + ' &nbsp;|&nbsp; ';
        });
        html += '</div></div>';
    });
    container.innerHTML = html;
}

function calculateCGPA() {
    if (savedSemesters.length === 0) {
        document.getElementById('final-result').innerHTML = '<p style="color:red;text-align:center;">Save at least one semester first.</p>';
        return;
    }
    var totalPoints = 0, totalCredits = 0, totalFails = 0;
    savedSemesters.forEach(function(s) {
        s.subjects.forEach(function(sub) {
            totalPoints += sub.gp * sub.credit;
            totalCredits += sub.credit;
            if (isFail(sub.gp)) totalFails++;
        });
    });
    var cgpa = totalPoints / totalCredits;
    var percent = ((cgpa - 0.5) * 10).toFixed(2);
    var g = getGradeFromPoint(cgpa);
    var overallGrade = getOverallGrade(cgpa);
    var name = document.getElementById('stu_name').value || 'N/A';
    var reg = document.getElementById('stu_reg').value || 'N/A';
    var college = document.getElementById('stu_college').value || 'N/A';
    var dept = document.getElementById('stu_dept').value || 'N/A';
    var ayear = document.getElementById('stu_ayear').value || 'N/A';
    var status = totalFails > 0 ? 'FAIL (' + totalFails + ' backlogs)' : 'PASS';
    var html = '<div class="final-box">';
    html += '<div class="student-print">';
    html += 'College: ' + college + '<br>';
    html += 'Name: ' + name + ' | Reg: ' + reg + '<br>';
    html += 'Dept: ' + dept + ' | Year: ' + ayear;
    html += '</div>';
    html += '<h3>Final Result</h3>';
    html += '<div class="cgpa-big">' + cgpa.toFixed(2) + '</div>';
    html += '<div class="details">';
    html += 'Grade: ' + g.grade + ' (' + overallGrade + ') | Percentage: ' + percent + '%<br>';
    html += 'Total Credits: ' + totalCredits + ' | Semesters: ' + savedSemesters.length + '<br>';
    html += 'Status: <strong>' + status + '</strong>';
    html += '</div></div>';
    document.getElementById('final-result').innerHTML = html;
    saveToHistory(cgpa, name, reg, dept);
}

function saveToHistory(cgpa, name, reg, dept) {
    var history = JSON.parse(localStorage.getItem('cgpaHistory') || '[]');
    var totalFails = 0;
    savedSemesters.forEach(function(s) {
        s.subjects.forEach(function(sub) {
            if (isFail(sub.gp)) totalFails++;
        });
    });
    history.unshift({
        date: new Date().toLocaleString(),
        cgpa: cgpa,
        grade: getOverallGrade(cgpa),
        name: name,
        reg: reg,
        dept: dept,
        semesters: JSON.parse(JSON.stringify(savedSemesters)),
        failCount: totalFails
    });
    if (history.length > 20) history = history.slice(0, 20);
    localStorage.setItem('cgpaHistory', JSON.stringify(history));
}

function loadHistory() {
    var history = JSON.parse(localStorage.getItem('cgpaHistory') || '[]');
    var container = document.getElementById('history-list');
    if (history.length === 0) {
        container.innerHTML = '<div class="no-history">No history yet. Calculate Final CGPA to see records.</div>';
        return;
    }
    var html = '';
    history.forEach(function(item) {
        var hasFail = item.failCount > 0;
        html += '<div class="history-card' + (hasFail ? ' has-fail' : '') + '">';
        html += '<div class="history-date">' + item.date + '</div>';
        html += '<div class="history-student">' + item.name + ' | ' + item.reg + ' | ' + item.dept + '</div>';
        html += '<div class="history-cgpa">CGPA: ' + item.cgpa.toFixed(2);
        html += ' <span class="history-grade ' + (hasFail ? 'grade-fail' : 'grade-pass') + '">' + item.grade + '</span>';
        if (hasFail) html += ' <span class="history-grade grade-fail">' + item.failCount + ' Fail</span>';
        html += '</div>';
        html += '<div class="history-semesters">';
        item.semesters.forEach(function(s) {
            var sg = getGradeFromPoint(s.sgpa);
            html += '<div>Sem ' + s.sem + ': SGPA ' + s.sgpa.toFixed(2) + ' (' + sg.grade + ') | Credits: ' + s.totalCredits;
            var semFails = 0;
            s.subjects.forEach(function(sub) { if (isFail(sub.gp)) semFails++; });
            if (semFails > 0) html += ' | <span class="fail-item">' + semFails + ' Fail</span>';
            html += '</div>';
        });
        html += '</div></div>';
    });
    container.innerHTML = html;
}

function clearHistory() {
    if (confirm('Clear all history?')) {
        localStorage.removeItem('cgpaHistory');
        loadHistory();
    }
}

function printResult() {
    window.print();
}

document.addEventListener('DOMContentLoaded', function() {
    addSubject('', '', '', '');
    addSubject('', '', '', '');
    addSubject('', '', '', '');
    addSubject('', '', '', '');
    addSubject('', '', '', '');
    renderSavedSemesters();
});
