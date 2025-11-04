document.addEventListener('DOMContentLoaded', function() {
    const app = document.getElementById('app');

    // デモの初期状態
    const state = {
        steps: [
            { channel: 'LINE', status: 'idle', log: '' },
            { channel: 'SMS', status: 'idle', log: '' },
            { channel: '電話', status: 'idle', log: '' }
        ],
        running: false,
        copied: null
    };

    // ステップの状態を更新
    function updateStep(index, updates) {
        state.steps[index] = { ...state.steps[index], ...updates };
        render();
    }

    // トーストメッセージを表示
    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 1500);
    }

    // デモのリセット
    function resetDemo() {
        state.steps = state.steps.map(step => ({ ...step, status: 'idle', log: '' }));
        state.running = false;
        render();
    }

    // デモの開始
    function startDemo() {
        if (state.running) return;
        state.running = true;
        updateStep(0, { status: 'sending', log: 'メッセージ送信中' });

        setTimeout(() => updateStep(0, { status: 'sent', log: '送信済み' }), 800);
        setTimeout(() => updateStep(0, { status: 'delivered', log: '配信済み' }), 1600);
        setTimeout(() => {
            const read = Math.random() < 0.5;
            if (read) {
                updateStep(0, { status: 'read', log: '既読' });
            } else {
                updateStep(0, { status: 'failed', log: '未読のためフォールバック' });
                updateStep(1, { status: 'sending', log: 'SMS送信中' });
                setTimeout(() => updateStep(1, { status: 'sent', log: 'SMS送信済み' }), 800);
            }
        }, 3000);
    }

    // UIのレンダリング
    function render() {
        app.innerHTML = `
            <div class="card">
                <h1>多段階通知デモ</h1>
                <button class="button" onclick="startDemo()">デモ開始</button>
                <button class="button" onclick="resetDemo()">リセット</button>
                <div>
                    ${state.steps.map((step, index) => `
                        <div>
                            <strong>${step.channel}</strong>: ${step.status} (${step.log})
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    render();
});