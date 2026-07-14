export { ThreeCanvasRoot, type ThreeCanvasRootProps } from './ThreeCanvasRoot';
export { SceneRoot, type SceneRootProps } from './SceneRoot';
export { PbrDemoObject, type PbrDemoObjectProps } from './components/PbrDemoObject';
export { SharpTextDemo, type SharpTextDemoProps } from './components/SharpTextDemo';
export {
  type QualityTier,
  type QualitySettings,
  QUALITY_CONFIG,
  detectDeviceQualityTier,
  getQualitySettings,
} from './config/quality';
export {
  type RendererSnapshot,
  captureRendererMetrics,
  FramePerformanceTracker,
} from './utils/performance';
