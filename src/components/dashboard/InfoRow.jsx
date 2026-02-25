/**
 * InfoRow Component
 * Displays a labeled information row with optional icon
 */
const InfoRow = ({ label, value, icon }) => (
  <div className="flex items-start gap-3">
    {icon && <div className="p-2 rounded-lg bg-default-100 text-default-500">{icon}</div>}
    <div>
      <p className="text-sm text-default-400">{label}</p>
      <p className="font-medium">{value || '-'}</p>
    </div>
  </div>
);

export default InfoRow;
