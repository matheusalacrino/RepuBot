import { Button } from "@/components/ui/button";

const ActionButton = ({ icon, label, onClick }) => (
  <Button 
    variant="outline" 
    className="h-20 flex flex-col gap-2 hover:bg-gray-50 hover:border-gray-300"
    onClick={onClick}
  >
    {icon}
    <span className="text-sm font-medium">{label}</span>
  </Button>
);

export default ActionButton;
