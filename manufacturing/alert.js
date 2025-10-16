const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        y: {
            beginAtZero: true,
            max: 100
        }
    }
};

const unauthorizedAccessData = {
    labels: ['1時間前', '30分前', '現在'],
    datasets: [{
        label: '試行回数',
        data: [5, 10, 3],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
    }]
};

const firewallActivityData = {
    labels: ['1時間前', '30分前', '現在'],
    datasets: [{
        label: 'アクティビティ数',
        data: [20, 25, 30],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
    }]
};

const virusDetectionData = {
    labels: ['1時間前', '30分前', '現在'],
    datasets: [{
        label: '検知数',
        data: [1, 2, 1],
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
    }]
};

const loginSuccessRateData = {
    labels: ['1時間前', '30分前', '現在'],
    datasets: [{
        label: '成功率 (%)',
        data: [95, 90, 92],
        backgroundColor: 'rgba(153, 102, 255, 0.5)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1
    }]
};

const dataTransferData = {
    labels: ['1時間前', '30分前', '現在'],
    datasets: [{
        label: '転送量 (MB)',
        data: [500, 700, 600],
        backgroundColor: 'rgba(255, 206, 86, 0.5)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1
    }]
};

const systemUptimeData = {
    labels: ['1時間前', '30分前', '現在'],
    datasets: [{
        label: '稼働率 (%)',
        data: [99, 98, 99],
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
    }]
};

const cpuUsageData = {
    labels: ['1時間前', '30分前', '現在'],
    datasets: [{
        label: 'CPU 使用率',
        data: [30, 50, 70],
        backgroundColor: 'rgba(255, 159, 64, 0.5)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1
    }]
};

const memoryUsageData = {
    labels: ['1時間前', '30分前', '現在'],
    datasets: [{
        label: 'メモリ使用量 (%)',
        data: [60, 65, 70],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
    }]
};

const diskUsageData = {
    labels: ['1時間前', '30分前', '現在'],
    datasets: [{
        label: 'ディスク使用量 (%)',
        data: [40, 50, 60],
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
    }]
};

function initializeCharts() {
    new Chart(document.getElementById('unauthorizedAccessChart'), {
        type: 'bar',
        data: unauthorizedAccessData,
        options: chartOptions
    });

    new Chart(document.getElementById('firewallActivityChart'), {
        type: 'line',
        data: firewallActivityData,
        options: chartOptions
    });

    new Chart(document.getElementById('virusDetectionChart'), {
        type: 'bar',
        data: virusDetectionData,
        options: chartOptions
    });

    new Chart(document.getElementById('loginSuccessRateChart'), {
        type: 'line',
        data: loginSuccessRateData,
        options: chartOptions
    });

    new Chart(document.getElementById('dataTransferChart'), {
        type: 'bar',
        data: dataTransferData,
        options: chartOptions
    });

    new Chart(document.getElementById('systemUptimeChart'), {
        type: 'line',
        data: systemUptimeData,
        options: chartOptions
    });

    new Chart(document.getElementById('cpuUsageChart'), {
        type: 'bar',
        data: cpuUsageData,
        options: chartOptions
    });

    new Chart(document.getElementById('memoryUsageChart'), {
        type: 'line',
        data: memoryUsageData,
        options: chartOptions
    });

    new Chart(document.getElementById('diskUsageChart'), {
        type: 'bar',
        data: diskUsageData,
        options: chartOptions
    });
}

document.addEventListener('DOMContentLoaded', initializeCharts);