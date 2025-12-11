declare module "@/Imported Components/BounceCards" {
  export interface BounceCardsProps {
    className?: string;
    images?: string[];
    containerWidth?: number;
    containerHeight?: number;
    animationDelay?: number;
    animationStagger?: number;
    easeType?: string;
    transformStyles?: string[];
    enableHover?: boolean;
  }

  export default function BounceCards(props: BounceCardsProps): JSX.Element;
}
