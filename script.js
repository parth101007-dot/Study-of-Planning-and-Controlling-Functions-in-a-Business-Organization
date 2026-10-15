const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
menuToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => navLinks.classList.remove('open')));
document.getElementById('printBtn').addEventListener('click', () => window.print());

const targetInput = document.getElementById('target');
const actualInput = document.getElementById('actual');
const gapValue = document.getElementById('gapValue');
const resultMessage = document.getElementById('resultMessage');
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
const resultBox = document.getElementById('resultBox');

function formatRupees(value) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);
}
function comparePerformance() {
  const target = Math.max(0, Number(targetInput.value) || 0);
  const actual = Math.max(0, Number(actualInput.value) || 0);
  const gap = actual - target;
  const percent = target > 0 ? (actual / target) * 100 : (actual > 0 ? 100 : 0);
  const safePercent = Math.min(100, Math.max(0, percent));
  gapValue.textContent = (gap < 0 ? '−' : gap > 0 ? '+' : '') + formatRupees(Math.abs(gap));
  gapValue.style.color = gap < 0 ? '#e28b43' : gap > 0 ? '#169b78' : '#4267f5';
  progressBar.style.width = safePercent + '%';
  progressBar.style.background = gap < 0 ? '#e6a04d' : '#22a783';
  progressText.textContent = (target > 0 ? percent.toFixed(1) : (actual > 0 ? 'Target not set' : '0')) + (target > 0 ? '% of target achieved' : '');
  if (target === 0) {
    resultMessage.textContent = 'Set a target above zero to calculate a meaningful performance gap.';
  } else if (gap < 0) {
    resultMessage.textContent = `Sales are ${Math.abs(100 - percent).toFixed(1)}% below target. Review demand, pricing, promotion, and stock availability, then take corrective action.`;
  } else if (gap > 0) {
    resultMessage.textContent = `Sales are ${((percent - 100)).toFixed(1)}% above target. Identify what worked and consider whether the result can be sustained.`;
  } else {
    resultMessage.textContent = 'The target has been achieved exactly. Continue monitoring performance and maintain the current process where effective.';
  }
  resultBox.setAttribute('data-status', gap < 0 ? 'below' : gap > 0 ? 'above' : 'met');
}
document.getElementById('calculateBtn').addEventListener('click', comparePerformance);
[targetInput, actualInput].forEach(input => input.addEventListener('keydown', e => { if (e.key === 'Enter') comparePerformance(); }));
comparePerformance();
