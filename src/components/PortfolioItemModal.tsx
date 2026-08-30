import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  FileText,
  CheckCircle2,
  Phone,
  MapPin,
  Youtube,
  Award,
  Sparkles,
  Camera,
  Image as ImageIcon,
  ZoomIn,
  Plus,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Presentation,
  Loader2,
  UploadCloud,
  FileUp,
  Trash2,
  Edit3,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Check,
  RefreshCw,
  LayoutGrid,
  List,
  FileCode,
  ExternalLink,
  Globe,
} from 'lucide-react';
import { PortfolioItem } from '../types';
import { SessionThumbnail } from './SessionThumbnail';
import { compressImage } from '../utils/imageCompressor';
import { convertPdfToImageSlides, PdfSlideItem } from '../utils/pdfSlideConverter';
import { getItem, saveItem, removeItem, getItemWithFallback, saveSessionItem } from '../utils/storage';
import { useAdmin } from '../context/AdminContext';
import { DEFAULT_HTML_APP } from '../data/defaultWebAppHtml';
import { PORTFOLIO_CATEGORIES } from '../data/portfolioData';
import { WebIcon } from './WebIcon';

interface PortfolioItemModalProps {
  item: PortfolioItem | null;
  onClose: () => void;
  onOpenInquiry?: () => void;
  onOpenTrialModal?: () => void;
  onSelectItem?: (item: PortfolioItem) => void;
}

export interface GalleryPhotoItem {
  id: string;
  url: string;
  title: string;
  pdfName?: string;
  pdfId?: string;
  pageNum?: number;
  totalPages?: number;
}

const DEFAULT_GALLERY_PHOTOS: Record<string, Array<{ id: string; url: string; title: string }>> = {
  'gallery-1': [
    { id: 'm-1', url: '/images/museum (1).JPG', title: '메타버스 박물관 프로젝트 (1)' },
    { id: 'm-2', url: '/images/museum (2).JPG', title: '메타버스 박물관 프로젝트 (2)' },
    { id: 'm-3', url: '/images/museum (3).JPG', title: '메타버스 박물관 프로젝트 (3)' },
    { id: 'm-4', url: '/images/museum (4).JPG', title: '메타버스 박물관 프로젝트 (4)' },
    { id: 'm-5', url: '/images/museum (5).JPG', title: '메타버스 박물관 프로젝트 (5)' },
    { id: 'm-6', url: '/images/museum (6).JPG', title: '메타버스 박물관 프로젝트 (6)' },
    { id: 'm-7', url: '/images/museum (7).JPG', title: '메타버스 박물관 프로젝트 (7)' },
    { id: 'm-8', url: '/images/museum (8).JPG', title: '메타버스 박물관 프로젝트 (8)' },
    { id: 'm-9', url: '/images/museum (9).JPG', title: '메타버스 박물관 프로젝트 (9)' },
    { id: 'm-10', url: '/images/museum (10).JPG', title: '메타버스 박물관 프로젝트 (10)' },
    { id: 'm-11', url: '/images/museum (11).JPG', title: '메타버스 박물관 프로젝트 (11)' },
    { id: 'm-12', url: '/images/museum (12).JPG', title: '메타버스 박물관 프로젝트 (12)' },
    { id: 'm-13', url: '/images/museum (13).JPG', title: '메타버스 박물관 프로젝트 (13)' },
    { id: 'm-14', url: '/images/museum (14).JPG', title: '메타버스 박물관 프로젝트 (14)' },
    { id: 'm-15', url: '/images/museum (15).JPG', title: '메타버스 박물관 프로젝트 (15)' },
    { id: 'm-16', url: '/images/museum (16).JPG', title: '메타버스 박물관 프로젝트 (16)' },
    { id: 'm-17', url: '/images/museum (17).JPG', title: '메타버스 박물관 프로젝트 (17)' },
    { id: 'm-18', url: '/images/museum (18).JPG', title: '메타버스 박물관 프로젝트 (18)' },
    { id: 'm-19', url: '/images/museum (19).JPG', title: '메타버스 박물관 프로젝트 (19)' },
    { id: 'm-20', url: '/images/museum (20).JPG', title: '메타버스 박물관 프로젝트 (20)' },
    { id: 'm-21', url: '/images/museum (21).JPG', title: '메타버스 박물관 프로젝트 (21)' },
  ],
  'gallery-2': [
    { id: 'ar-1', url: '/images/ar (1).jpg', title: 'AR 얼굴인식 & 인공지능 프로젝트 (1)' },
    { id: 'ar-2', url: '/images/ar (2).jpg', title: 'AR 얼굴인식 & 인공지능 프로젝트 (2)' },
    { id: 'ar-3', url: '/images/ar (3).jpg', title: 'AR 얼굴인식 & 인공지능 프로젝트 (3)' },
    { id: 'ar-4', url: '/images/ar (4).jpg', title: 'AR 얼굴인식 & 인공지능 프로젝트 (4)' },
    { id: 'ar-5', url: '/images/ar (5).jpg', title: 'AR 얼굴인식 & 인공지능 프로젝트 (5)' },
    { id: 'ar-6', url: '/images/ar (6).jpg', title: 'AR 얼굴인식 & 인공지능 프로젝트 (6)' },
    { id: 'ar-7', url: '/images/ar (7).jpg', title: 'AR 얼굴인식 & 인공지능 프로젝트 (7)' },
    { id: 'ar-8', url: '/images/ar (8).jpg', title: 'AR 얼굴인식 & 인공지능 프로젝트 (8)' },
    { id: 'ar-9', url: '/images/ar (9).jpg', title: 'AR 얼굴인식 & 인공지능 프로젝트 (9)' },
  ],
  'gallery-3': [
    { id: 'future-1', url: '/images/future (1).jpg', title: 'AI 미래발명품 & 바이브코딩 (1)' },
    { id: 'future-2', url: '/images/future (2).jpg', title: 'AI 미래발명품 & 바이브코딩 (2)' },
    { id: 'future-3', url: '/images/future (3).jpg', title: 'AI 미래발명품 & 바이브코딩 (3)' },
  ],
  'padlet-34': [
    { id: 'p34-1', url: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80', title: '초등 3~4학년 패들렛 과제 공유 게시판' },
    { id: 'p34-2', url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80', title: '엔트리 코딩 과제 & 학생 작품 공유' },
    { id: 'p34-3', url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80', title: '실시간 피드백 및 학생 아이디어 모음' },
    { id: 'p34-4', url: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80', title: 'AI 머신러닝 학습 과제 제출물' },
  ],
  'webapp-56': [
    { id: 'future-w-1', url: '/images/future (1).jpg', title: 'AI 미래발명품 & 바이브코딩 웹앱 (1)' },
    { id: 'future-w-2', url: '/images/future (2).jpg', title: 'AI 미래발명품 & 바이브코딩 웹앱 (2)' },
    { id: 'future-w-3', url: '/images/future (3).jpg', title: 'AI 미래발명품 & 바이브코딩 웹앱 (3)' },
  ],
};

const FALLBACK_GALLERY_PHOTOS = [
  { id: 'f-1', url: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80', title: '생생한 알고리즘 실습 현장' },
  { id: 'f-2', url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80', title: '창의 코딩 지도 프로젝트' },
  { id: 'f-3', url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80', title: '팀워크 및 아이디어 발표' },
  { id: 'f-4', url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80', title: '스마트 피지컬 교구 연동' },
];

export const PortfolioItemModal: React.FC<PortfolioItemModalProps> = ({ item, onClose, onOpenInquiry, onSelectItem }) => {
  const modalContentRef = useRef<HTMLDivElement>(null);

  // Calculate Next Item for direct curriculum navigation
  const allPortfolioItems = React.useMemo(() => PORTFOLIO_CATEGORIES.flatMap((cat) => cat.items), []);
  const currentItemIndex = item ? allPortfolioItems.findIndex((i) => i.id === item.id) : -1;
  const nextPortfolioItem = currentItemIndex !== -1 ? allPortfolioItems[(currentItemIndex + 1) % allPortfolioItems.length] : null;

  const isPadlet = Boolean(item && (item.id.includes('padlet') || item.title.includes('패들렛')));
  const isWebApp = Boolean(item && (item.id.includes('webapp') || item.title.includes('웹앱')));
  const isGalleryType = Boolean(
    item &&
    (item.type === 'gallery_link' ||
    item.id.startsWith('gallery-') ||
    item.title.includes('갤러리')) && !isPadlet && !isWebApp
  );

  const [mainImgUrl, setMainImgUrl] = useState<string>('');
  const [sessionImages, setSessionImages] = useState<Record<number, string>>({});
  const [galleryPhotos, setGalleryPhotos] = useState<GalleryPhotoItem[]>([]);
  const [galleryViewMode, setGalleryViewMode] = useState<'grid' | 'list'>('grid');
  const [externalUrl, setExternalUrl] = useState<string>('');
  const [htmlContent, setHtmlContent] = useState<string>('');
  const [isCodeEditing, setIsCodeEditing] = useState<boolean>(false);
  
  // PPT Presentation & Lightbox state
  const [activeSlideIndex, setActiveSlideIndex] = useState<number | null>(null);
  const [isPptMode, setIsPptMode] = useState<boolean>(false);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(false);
  const [isConvertingPdf, setIsConvertingPdf] = useState<boolean>(false);
  const [pdfProgressMsg, setPdfProgressMsg] = useState<string>('');

  // Editing Title & Slide Management State
  const [editingTitleIndex, setEditingTitleIndex] = useState<number | null>(null);
  const [editingTitleText, setEditingTitleText] = useState<string>('');

  const { isAdmin } = useAdmin();
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Computed PDF Groups for PDF File List Management
  const pdfGroups = React.useMemo(() => {
    const groups: Record<string, { pdfName: string; pdfId?: string; slides: GalleryPhotoItem[]; count: number }> = {};
    
    galleryPhotos.forEach((photo) => {
      const groupName = photo.pdfName || '개별 업로드 이미지 / 기타 슬라이드';
      if (!groups[groupName]) {
        groups[groupName] = {
          pdfName: groupName,
          pdfId: photo.pdfId,
          slides: [],
          count: 0,
        };
      }
      groups[groupName].slides.push(photo);
      groups[groupName].count++;
    });

    return Object.values(groups);
  }, [galleryPhotos]);

  // Delete all slides associated with a specific PDF file
  const handleDeletePdfGroup = async (pdfName: string) => {
    const groupInfo = pdfGroups.find((g) => g.pdfName === pdfName);
    if (!groupInfo) return;

    const targetIds = new Set(groupInfo.slides.map((s) => s.id));
    const updated = galleryPhotos.filter((photo) => !targetIds.has(photo.id));
    setGalleryPhotos(updated);
    await saveItem(`gallery_photos_${item.id}`, JSON.stringify(updated));
  };

  // Delete single slide handler
  const handleDeleteSlide = async (index: number) => {
    const updated = galleryPhotos.filter((_, i) => i !== index);
    setGalleryPhotos(updated);
    await saveItem(`gallery_photos_${item.id}`, JSON.stringify(updated));
  };

  // Start editing slide title
  const handleStartEditTitle = (index: number, currentTitle: string) => {
    setEditingTitleIndex(index);
    setEditingTitleText(currentTitle);
  };

  // Save edited slide title
  const handleSaveEditTitle = async (index: number) => {
    if (!editingTitleText.trim()) return;
    const updated = [...galleryPhotos];
    updated[index] = { ...updated[index], title: editingTitleText.trim() };
    setGalleryPhotos(updated);
    await saveItem(`gallery_photos_${item.id}`, JSON.stringify(updated));
    setEditingTitleIndex(null);
  };

  // Move slide position (left/up or right/down)
  const handleMoveSlide = async (index: number, direction: 'left' | 'right') => {
    const targetIndex = direction === 'left' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= galleryPhotos.length) return;

    const updated = [...galleryPhotos];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    setGalleryPhotos(updated);
    await saveItem(`gallery_photos_${item.id}`, JSON.stringify(updated));
  };

  // Overwrite entire gallery with new PDF file
  const handleOverwriteGalleryWithPdf = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
        setIsConvertingPdf(true);
        setPdfProgressMsg('기존 슬라이드를 모두 교체 중... PDF 문서를 PPT 슬라이드로 변환하고 있습니다.');

        const pdfResult = await convertPdfToImageSlides(file, `${item.title} 발표 자료`);
        if (pdfResult.slides.length > 0) {
          setGalleryPhotos(pdfResult.slides);
          await saveItem(`gallery_photos_${item.id}`, JSON.stringify(pdfResult.slides));
        }
        setIsConvertingPdf(false);
      } else {
        const compressedDataUrl = await compressImage(file, 1600, 900, 0.88);
        const newPhoto = [
          {
            id: `gphoto-${Date.now()}`,
            url: compressedDataUrl,
            title: `수업 활동 사진 #1`,
          },
        ];
        setGalleryPhotos(newPhoto);
        await saveItem(`gallery_photos_${item.id}`, JSON.stringify(newPhoto));
      }
    } catch (err) {
      console.error('Overwrite PDF error:', err);
      setIsConvertingPdf(false);
    }
  };

  // Clear all slides
  const handleClearAllSlides = async () => {
    setGalleryPhotos([]);
    await saveItem(`gallery_photos_${item.id}`, JSON.stringify([]));
  };

  // Reset to default photos
  const handleResetToDefault = async () => {
    if (!item) return;
    const defaults = DEFAULT_GALLERY_PHOTOS[item.id] || FALLBACK_GALLERY_PHOTOS;
    setGalleryPhotos(defaults);
    await removeItem(`gallery_photos_${item.id}`);
  };

  // Guarantee body overflow cleanup when modal opens and closes
  useEffect(() => {
    if (!item) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [item]);

  const handleModalClose = () => {
    document.body.style.overflow = '';
    onClose();
  };

  useEffect(() => {
    if (!item) return;
    const loadImages = async () => {
      const defaultPadletUrl = (item.categoryKey === 'grade34' || item.id.includes('34'))
        ? 'https://padlet.com/dlrka0131/ai-c1yapf5jriur6rav'
        : 'https://padlet.com/dlrka0131/6-bwwl5nvlo6ohxm4h';

      // Load externalUrl (for Padlet or WebApp)
      let savedExtUrl = await getItem(`ext_url_${item.id}`);
      if (isPadlet && (!savedExtUrl || savedExtUrl === 'https://padlet.com')) {
        savedExtUrl = item.fileDownloadUrl || defaultPadletUrl;
      }

      if (isWebApp) {
        // For WebApp, externalUrl is only set if user manually entered a valid external URL that is not a self-referencing dev server
        if (savedExtUrl && !savedExtUrl.includes('ais-dev-') && !savedExtUrl.includes('ais-pre-') && savedExtUrl.startsWith('http')) {
          setExternalUrl(savedExtUrl);
        } else {
          setExternalUrl('');
        }
      } else if (isPadlet) {
        setExternalUrl(savedExtUrl || item.fileDownloadUrl || defaultPadletUrl);
      } else {
        setExternalUrl(savedExtUrl || item.fileDownloadUrl || '');
      }

      // Load HTML App file/content
      if (isWebApp) {
        const savedHtml = await getItem(`html_app_${item.id}`);
        if (!savedHtml || !savedHtml.includes('clipboard-frame') || !savedHtml.includes('field-group') || savedHtml.includes('활동 웹앱 프로젝트')) {
          setHtmlContent(DEFAULT_HTML_APP);
          await saveItem(`html_app_${item.id}`, DEFAULT_HTML_APP);
        } else {
          setHtmlContent(savedHtml);
        }
      }

      if (isGalleryType) {
        // Load gallery photo list from storage or use defaults
        const savedGallery = await getItem(`gallery_photos_${item.id}`);
        if (savedGallery !== null) {
          try {
            const parsed = JSON.parse(savedGallery);
            if (Array.isArray(parsed) && parsed.length > 0) {
              const hasOldUnsplash = parsed.some((p: any) => p.id?.startsWith('g1-') || p.id?.startsWith('g2-') || p.id?.startsWith('g3-'));
              if (!hasOldUnsplash) {
                setGalleryPhotos(parsed);
                return;
              }
            }
          } catch (e) {
            console.error('Error parsing saved gallery photos', e);
          }
        }
        // Fallback default photos if savedGallery is null or old placeholder
        const defaults = DEFAULT_GALLERY_PHOTOS[item.id] || FALLBACK_GALLERY_PHOTOS;
        setGalleryPhotos(defaults);
      } else {
        // Load main image override from storage
        const savedMain = await getItem(`main_img_${item.id}`);
        setMainImgUrl(savedMain || item.imageUrl || '');

        // Load lesson outline session images
        if (item.lessonOutline) {
          const sessMap: Record<number, string> = {};
          for (const outline of item.lessonOutline) {
            const customImgKey = `session_img_${item.id}_sess${outline.lessonNumber}`;
            const savedSess =
              (await getItemWithFallback(customImgKey)) ||
              outline.defaultImage ||
              (item.id === 'hello-maple' ? `/images/hellomaple_${outline.lessonNumber}.svg` : '');
            if (savedSess) {
              sessMap[outline.lessonNumber] = savedSess;
            }
          }
          setSessionImages(sessMap);
        }
      }
    };
    loadImages();
  }, [item, isGalleryType, isPadlet, isWebApp]);

  const handleHtmlFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.html') && !file.name.toLowerCase().endsWith('.htm')) {
      alert('HTML 파일(.html, .htm)만 업로드하실 수 있습니다.');
      e.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      const text = event.target?.result as string;
      if (text) {
        setHtmlContent(text);
        await saveItem(`html_app_${item.id}`, text);
        alert('✨ HTML 웹앱 파일이 성공적으로 업로드 및 적용되었습니다!');
      }
    };
    reader.onerror = () => {
      alert('파일을 읽는 도중 오류가 발생했습니다.');
    };
    reader.readAsText(file, 'UTF-8');
    e.target.value = '';
  };

  // Auto-play interval effect for PPT Slide Presentation mode
  useEffect(() => {
    if (isAutoPlay && activeSlideIndex !== null && galleryPhotos.length > 1) {
      autoPlayTimerRef.current = setInterval(() => {
        setActiveSlideIndex((prev) => (prev !== null ? (prev + 1) % galleryPhotos.length : 0));
      }, 3500);
    } else if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current);
    }

    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [isAutoPlay, activeSlideIndex, galleryPhotos.length]);

  // Keyboard navigation for PPT presentation slides
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeSlideIndex === null) return;

      if (e.key === 'ArrowRight' || e.key === 'Space') {
        e.preventDefault();
        setActiveSlideIndex((prev) => (prev !== null ? (prev + 1) % galleryPhotos.length : 0));
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setActiveSlideIndex((prev) =>
          prev !== null ? (prev - 1 + galleryPhotos.length) % galleryPhotos.length : 0
        );
      } else if (e.key === 'Escape') {
        setActiveSlideIndex(null);
        setIsPptMode(false);
        setIsAutoPlay(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSlideIndex, galleryPhotos.length]);

  if (!item) return null;

  // Handler for uploading main modal photo (Non-gallery items)
  const handleMainImgUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const compressedDataUrl = await compressImage(file, 1600, 900, 0.85);
      await saveItem(`main_img_${item.id}`, compressedDataUrl);
      setMainImgUrl(compressedDataUrl);
    } catch (err) {
      console.error('Main image upload error:', err);
      alert('사진 업로드 중 오류가 발생했습니다.');
    }
  };

  // Handler for uploading session outline photo
  const handleSessionImgUpload = async (lessonNumber: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const compressedDataUrl = await compressImage(file, 1600, 900, 0.85);
      const customImgKey = `session_img_${item.id}_sess${lessonNumber}`;
      await saveSessionItem(customImgKey, compressedDataUrl);

      setSessionImages((prev) => ({
        ...prev,
        [lessonNumber]: compressedDataUrl,
      }));
    } catch (err) {
      console.error('Session image upload error:', err);
      alert('사진 업로드 중 오류가 발생했습니다.');
    }
  };

  // Handler for replacing a photo in Gallery mode
  const handleReplaceGalleryPhoto = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
        setIsConvertingPdf(true);
        setPdfProgressMsg('PDF 발표 슬라이드를 변환하는 중입니다...');
        const pdfResult = await convertPdfToImageSlides(file, item.title);
        
        if (pdfResult.slides.length > 0) {
          const updated = [...galleryPhotos];
          // Replace current index with first slide, insert remaining after
          updated.splice(index, 1, ...pdfResult.slides);
          setGalleryPhotos(updated);
          await saveItem(`gallery_photos_${item.id}`, JSON.stringify(updated));
        }
        setIsConvertingPdf(false);
      } else {
        const compressedDataUrl = await compressImage(file, 1600, 900, 0.88);
        const updated = [...galleryPhotos];
        updated[index] = {
          ...updated[index],
          url: compressedDataUrl,
        };
        setGalleryPhotos(updated);
        await saveItem(`gallery_photos_${item.id}`, JSON.stringify(updated));
      }
    } catch (err) {
      console.error('Gallery upload error:', err);
      setIsConvertingPdf(false);
    }
  };

  // Handler for uploading new photo OR PDF file to Gallery mode
  const handleAddGalleryPhotoOrPdf = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
        setIsConvertingPdf(true);
        setPdfProgressMsg('PDF 문서를 고화질 PPT 슬라이드로 변환 중입니다...');
        
        const pdfResult = await convertPdfToImageSlides(file, `${item.title} 발표 자료`);
        if (pdfResult.slides.length > 0) {
          const updated = [...galleryPhotos, ...pdfResult.slides];
          setGalleryPhotos(updated);
          await saveItem(`gallery_photos_${item.id}`, JSON.stringify(updated));
        }
        setIsConvertingPdf(false);
      } else {
        const compressedDataUrl = await compressImage(file, 1600, 900, 0.88);
        const newPhoto = {
          id: `gphoto-${Date.now()}`,
          url: compressedDataUrl,
          title: `수업 활동 사진 #${galleryPhotos.length + 1}`,
        };
        const updated = [...galleryPhotos, newPhoto];
        setGalleryPhotos(updated);
        await saveItem(`gallery_photos_${item.id}`, JSON.stringify(updated));
      }
    } catch (err) {
      console.error('Add photo/PDF error:', err);
      setIsConvertingPdf(false);
    }
  };

  // Start PPT Presentation Slide Mode
  const handleStartPptPresentation = (startIndex: number = 0) => {
    setActiveSlideIndex(startIndex);
    setIsPptMode(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-[#2D2826]/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-[96vw] xl:max-w-[92vw] 2xl:max-w-[1600px] h-[95vh] bg-white border-2 border-[#F0E6DF] rounded-[32px] shadow-2xl overflow-hidden flex flex-col text-[#383331]">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-6 bg-[#FFF8F0] border-b border-[#F5E2D5] flex items-center justify-between gap-4 shrink-0">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-[#FF7066] text-white font-extrabold text-xs px-3.5 py-1 rounded-full shadow-2xs">
                {item.categoryTitle}
              </span>
              {item.targetGrade && (
                <span className="bg-[#FFF0E6] text-[#2D2826] font-bold text-xs px-3 py-1 rounded-full border border-[#FFD2BC]">
                  {item.targetGrade}
                </span>
              )}
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-[#2D2826] flex items-center gap-2.5">
              <span className="p-1.5 rounded-xl bg-[#FFEBE8] text-[#FF5A4D] flex items-center justify-center">
                <WebIcon icon={item.typeIcon} className="w-6 h-6 text-[#FF5A4D]" />
              </span>
              <span>{item.title}</span>
            </h3>
          </div>

          <button
            onClick={handleModalClose}
            className="p-2.5 rounded-full bg-[#FF5A4D] hover:bg-[#FF4235] text-white font-black shadow-md transition-all hover:scale-110 cursor-pointer shrink-0 border-2 border-white"
            title="닫기"
          >
            <X className="w-6 h-6 stroke-[3]" />
          </button>
        </div>

        {/* Modal Body */}
        <div ref={modalContentRef} className="p-4 sm:p-6 overflow-y-auto space-y-8 text-[#5C4E46] text-sm">
          
          {/* Padlet Mode */}
          {isPadlet && (
            <div className="space-y-4">
              {/* Padlet Top Bar */}
              <div className="bg-gradient-to-r from-[#FFF0E6] via-[#FFF8F0] to-[#EAF2FF] p-5 rounded-3xl border-2 border-[#FFD2BC] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1 max-w-2xl">
                  <div className="flex items-center gap-2 font-black text-base text-[#2D2826] flex-wrap">
                    <span className="text-xl">📌</span>
                    <span>활동 패들렛(Padlet) 게시판 연결</span>
                    <span className="bg-[#1B6E32] text-white text-[11px] font-extrabold px-2.5 py-0.5 rounded-full shadow-2xs">
                      온라인 실시간 연동
                    </span>
                  </div>
                  <p className="text-xs text-[#5C4E46] font-bold">
                    학생들의 수업 과제, 아이디어 구상 및 작품 사진을 실시간으로 확인하고 소통하는 온라인 패들렛 게시판입니다.
                  </p>
                  {externalUrl && (
                    <div className="text-xs font-mono text-[#8C7B72] truncate max-w-md bg-white/80 px-2.5 py-1 rounded-lg border border-[#F5E2D5]">
                      🔗 {externalUrl}
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0 w-full sm:w-auto">
                  {externalUrl && (
                    <a
                      href={externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#FF7066] hover:bg-[#E05349] text-white font-black text-xs sm:text-sm rounded-2xl shadow-md hover:shadow-lg transition-all cursor-pointer w-full sm:w-auto"
                    >
                      <span>📌 패들렛 새 창으로 열기</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  <button
                    onClick={() => {
                      const defaultPadlet = (item.categoryKey === 'grade34' || item.id.includes('34'))
                        ? 'https://padlet.com/dlrka0131/ai-c1yapf5jriur6rav'
                        : 'https://padlet.com/dlrka0131/6-bwwl5nvlo6ohxm4h';
                      const newUrl = prompt('연결할 패들렛 URL 주소를 입력하세요:', externalUrl || defaultPadlet);
                      if (newUrl !== null && newUrl.trim() !== '') {
                        const trimmed = newUrl.trim();
                        setExternalUrl(trimmed);
                        saveItem(`ext_url_${item.id}`, trimmed);
                      }
                    }}
                    className="px-3.5 py-2.5 bg-white hover:bg-[#FFF0E6] text-[#2D2826] font-extrabold text-xs rounded-2xl border border-[#FFD2BC] shadow-2xs transition-colors cursor-pointer"
                  >
                    ✏️ 패들렛 주소 수정
                  </button>
                </div>
              </div>

              {/* Padlet Frame */}
              {externalUrl ? (
                <div className="w-full h-[650px] bg-white rounded-3xl overflow-hidden border-2 border-[#F5E2D5] shadow-lg relative">
                  <iframe
                    src={externalUrl}
                    title="Padlet Board"
                    className="w-full h-full border-0"
                    allow="camera; microphone; geolocation"
                  />
                </div>
              ) : (
                <div className="p-12 text-center bg-white rounded-3xl border-2 border-dashed border-[#FFD2BC] space-y-4">
                  <span className="text-5xl block">📌</span>
                  <h4 className="font-black text-lg text-[#2D2826]">등록된 패들렛 주소가 없습니다</h4>
                  <p className="text-xs text-[#8C7B72]">상단의 '패들렛 주소 수정' 버튼을 눌러 패들렛 URL을 설정하세요.</p>
                </div>
              )}
            </div>
          )}

          {/* WebApp Mode */}
          {isWebApp && (
            <div className="space-y-4">
              {/* WebApp Toolbar */}
              <div className="bg-gradient-to-r from-[#FFF0E6] via-[#FFF8F0] to-[#E3F2FD] p-5 rounded-3xl border-2 border-[#FFD2BC] shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 font-black text-base text-[#2D2826] flex-wrap">
                    <span className="text-xl">🌐</span>
                    <span>활동 웹앱(Web App) 실행 엔진</span>
                    <span className="bg-[#1B4B8C] text-white text-[11px] font-extrabold px-2.5 py-0.5 rounded-full shadow-2xs">
                      인터랙티브 SW
                    </span>
                  </div>
                  <p className="text-xs text-[#5C4E46] font-bold">
                    HTML, CSS, JS 파일 업로드 또는 코드 직접 편집을 통해 인터랙티브 웹앱을 실제 모달 내에서 실행합니다.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0 w-full md:w-auto">
                  {/* HTML File Upload */}
                  <label className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#FF7066] hover:bg-[#E05349] text-white font-black text-xs sm:text-sm rounded-2xl shadow-md cursor-pointer transition-all">
                    <FileCode className="w-4 h-4" />
                    <span>📂 HTML 파일 업로드</span>
                    <input
                      type="file"
                      accept=".html,.htm"
                      className="hidden"
                      onChange={handleHtmlFileUpload}
                    />
                  </label>

                  {/* HTML Code Edit toggle */}
                  <button
                    onClick={() => setIsCodeEditing(!isCodeEditing)}
                    className="px-3.5 py-2.5 bg-white hover:bg-[#FFF0E6] text-[#2D2826] font-extrabold text-xs rounded-2xl border border-[#FFD2BC] shadow-2xs transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-[#FF7066]" />
                    <span>{isCodeEditing ? '코드 편집 닫기' : '✏️ HTML 코드 직접 편집'}</span>
                  </button>

                  {/* External URL Edit */}
                  <button
                    onClick={() => {
                      const newUrl = prompt('외부 웹앱 URL 주소를 입력하세요 (선택 사항):', externalUrl || 'https://');
                      if (newUrl !== null) {
                        const trimmed = newUrl.trim();
                        setExternalUrl(trimmed);
                        saveItem(`ext_url_${item.id}`, trimmed);
                      }
                    }}
                    className="px-3 py-2.5 bg-white hover:bg-[#FFF0E6] text-[#8C7B72] font-extrabold text-xs rounded-2xl border border-[#F5E2D5] transition-colors cursor-pointer"
                  >
                    🔗 URL 입력
                  </button>

                  {/* External URL Open */}
                  {externalUrl && (
                    <a
                      href={externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 bg-white hover:bg-[#FFF0E6] text-[#2D2826] rounded-2xl border border-[#F5E2D5] shadow-2xs transition-colors cursor-pointer"
                      title="웹앱 새 창으로 크게 실행"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

              {/* Code Editor Area */}
              {isCodeEditing && (
                <div className="bg-[#1E1E1E] text-white p-4 rounded-3xl space-y-3 shadow-xl border-2 border-stone-800 animate-in fade-in">
                  <div className="flex items-center justify-between text-xs font-mono text-stone-400 border-b border-stone-700 pb-2">
                    <span className="flex items-center gap-1.5 text-stone-200 font-bold">
                      <FileCode className="w-4 h-4 text-[#FF7066]" />
                      HTML/CSS/JS 소스 코드 직접 편집
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={async () => {
                          setHtmlContent(DEFAULT_HTML_APP);
                          await saveItem(`html_app_${item.id}`, DEFAULT_HTML_APP);
                          alert('기본 샘플 웹앱 코드로 복원되었습니다.');
                        }}
                        className="text-stone-400 hover:text-white px-2.5 py-1 rounded bg-stone-800 text-[11px] cursor-pointer"
                      >
                        기본 코드로 초기화
                      </button>
                      <button
                        onClick={async () => {
                          await saveItem(`html_app_${item.id}`, htmlContent);
                          setIsCodeEditing(false);
                          alert('HTML 코드가 저장되어 즉시 반영되었습니다!');
                        }}
                        className="bg-[#FF7066] hover:bg-[#E05349] text-white font-bold px-3 py-1 rounded text-xs cursor-pointer shadow-xs"
                      >
                        저장 및 즉시 실행
                      </button>
                    </div>
                  </div>
                  <textarea
                    value={htmlContent}
                    onChange={(e) => setHtmlContent(e.target.value)}
                    rows={12}
                    className="w-full bg-[#121212] text-emerald-400 font-mono text-xs p-3.5 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#FF7066] resize-y"
                    placeholder="<html><body>...</body></html> 코드를 입력하세요."
                  />
                </div>
              )}

              {/* WebApp Execution Frame */}
              <div className="w-full h-[650px] bg-white rounded-3xl overflow-hidden border-2 border-[#F5E2D5] shadow-lg relative">
                {externalUrl ? (
                  <iframe
                    src={externalUrl}
                    title="External Web App"
                    className="w-full h-full border-0"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                  />
                ) : htmlContent ? (
                  <iframe
                    srcDoc={htmlContent}
                    title="Interactive Web App Preview"
                    className="w-full h-full border-0"
                    sandbox="allow-scripts allow-same-origin allow-modals allow-forms"
                  />
                ) : (
                  <div className="p-12 text-center bg-white rounded-3xl border-2 border-dashed border-[#FFD2BC] space-y-4">
                    <span className="text-5xl block">🌐</span>
                    <h4 className="font-black text-lg text-[#2D2826]">실행할 HTML 파일 또는 코드가 없습니다</h4>
                    <p className="text-xs text-[#8C7B72]">상단의 '📂 HTML 파일 업로드' 버튼을 이용하세요.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Pure Gallery Mode */}
          {isGalleryType && !isPadlet && !isWebApp && (
            <div className="space-y-6">
              {/* PPT Presentation Banner Header */}
              <div className="flex flex-col bg-[#FFF8F0] p-4 sm:p-5 rounded-3xl border-2 border-[#F5E2D5] gap-4">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-[#FF7066] text-white rounded-2xl shadow-sm">
                      <Presentation className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-black text-base sm:text-lg text-[#2D2826] flex items-center gap-2">
                        <span>{item.title} - 활동 갤러리 & PPT 발표자료</span>
                        <span className="text-xs bg-[#FF7066] text-white px-2.5 py-0.5 rounded-full font-bold">
                          {galleryPhotos.length} 슬라이드
                        </span>
                      </h4>
                      {isAdmin && (
                        <p className="text-xs text-[#8C7B72] font-extrabold">
                          16:9 고화질 와이드 슬라이드 및 업로드된 PDF 파일 리스트를 관리하실 수 있습니다.
                        </p>
                      )}
                    </div>
                  </div>

                  {/* View Mode Switcher & PPT Presentation Launch Button */}
                  <div className="flex flex-wrap items-center gap-2 w-full md:w-auto ml-auto">
                    {/* View Switcher - Only in Admin mode */}
                    {isAdmin && (
                      <div className="flex items-center gap-1 bg-white p-1 rounded-2xl border border-[#F5E2D5] shadow-xs">
                        <button
                          onClick={() => setGalleryViewMode('grid')}
                          className={`px-3.5 py-2 rounded-xl font-black text-xs flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                            galleryViewMode === 'grid'
                              ? 'bg-[#FF7066] text-white shadow-xs'
                              : 'text-[#8C7B72] hover:text-[#2D2826] hover:bg-[#FFF0E6]'
                          }`}
                        >
                          <LayoutGrid className="w-4 h-4" />
                          <span>카드 뷰</span>
                        </button>
                        <button
                          onClick={() => setGalleryViewMode('list')}
                          className={`px-3.5 py-2 rounded-xl font-black text-xs flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                            galleryViewMode === 'list'
                              ? 'bg-[#FF7066] text-white shadow-xs'
                              : 'text-[#8C7B72] hover:text-[#2D2826] hover:bg-[#FFF0E6]'
                          }`}
                        >
                          <List className="w-4 h-4" />
                          <span>PDF 및 리스트 뷰 ({galleryPhotos.length})</span>
                        </button>
                      </div>
                    )}

                    {/* PPT Slideshow Launch Button */}
                    {galleryPhotos.length > 0 && (
                      <button
                        onClick={() => handleStartPptPresentation(0)}
                        className="bg-[#2D2826] hover:bg-[#1A1817] text-white font-black px-4 xl:px-5 py-2.5 rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95 cursor-pointer whitespace-nowrap"
                      >
                        <Play className="w-4 h-4 text-[#FF7066] fill-[#FF7066]" />
                        <span>▶️ PPT 발표 시작</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Admin Multi-action Toolbar */}
                {isAdmin && (
                  <div className="pt-3 border-t border-[#F5E2D5] flex flex-wrap items-center justify-between gap-2.5 text-xs">
                    <div className="flex flex-wrap items-center gap-2">
                      {/* Add PDF or Photo */}
                      <label className="bg-[#FF7066] hover:bg-[#FF5C52] text-white font-black px-3.5 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs transition-transform active:scale-95">
                        <FileUp className="w-4 h-4" />
                        <span>📄 PDF / 이미지 추가</span>
                        <input
                          type="file"
                          accept="image/*,application/pdf,.pdf"
                          className="hidden"
                          onChange={handleAddGalleryPhotoOrPdf}
                        />
                      </label>

                      {/* Overwrite PDF or Photo */}
                      <label className="bg-[#2D2826] hover:bg-[#1A1817] text-white font-black px-3.5 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs transition-transform active:scale-95">
                        <RefreshCw className="w-4 h-4 text-[#FF7066]" />
                        <span>🔄 PDF로 전체 교체</span>
                        <input
                          type="file"
                          accept="image/*,application/pdf,.pdf"
                          className="hidden"
                          onChange={handleOverwriteGalleryWithPdf}
                        />
                      </label>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {/* Clear All */}
                      <button
                        onClick={handleClearAllSlides}
                        className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer transition-colors"
                        title="모든 슬라이드 삭제"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>전체 삭제</span>
                      </button>

                      {/* Reset to Default */}
                      <button
                        onClick={handleResetToDefault}
                        className="bg-stone-100 hover:bg-stone-200 text-[#5C4E46] border border-stone-300 font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer transition-colors"
                        title="원래 샘플 이미지로 초기화"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>기본 복원</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Uploaded PDF File Summary Manager Section (Admin Only) */}
              {isAdmin && pdfGroups.length > 0 && (
                <div className="bg-[#FFFBF7] p-4.5 rounded-3xl border-2 border-[#F0E6DF] space-y-3">
                  <div className="flex items-center justify-between">
                    <h5 className="font-black text-sm text-[#2D2826] flex items-center gap-2">
                      <FileText className="w-4.5 h-4.5 text-[#FF7066]" />
                      <span>업로드된 PDF 문서 / 슬라이드 파일 목록 ({pdfGroups.length}개 그룹)</span>
                    </h5>
                    <span className="text-xs text-[#8C7B72] font-semibold">
                      파일 단위로 전체 삭제할 수 있습니다.
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {pdfGroups.map((group, gIdx) => (
                      <div
                        key={gIdx}
                        className="bg-white p-3.5 rounded-2xl border border-[#F0E6DF] flex items-center justify-between gap-3 shadow-xs hover:border-[#FF7066] transition-colors"
                      >
                        <div className="flex items-center gap-2.5 truncate flex-1">
                          <div className="p-2 bg-[#FFEBE8] text-[#FF7066] rounded-xl shrink-0">
                            <FileCode className="w-4.5 h-4.5" />
                          </div>
                          <div className="truncate">
                            <h6 className="font-bold text-xs text-[#2D2826] truncate" title={group.pdfName}>
                              {group.pdfName}
                            </h6>
                            <p className="text-[11px] text-[#8C7B72] font-semibold">
                              슬라이드 {group.count}장 포함
                            </p>
                          </div>
                        </div>

                        {isAdmin && (
                          <button
                            onClick={() => handleDeletePdfGroup(group.pdfName)}
                            className="bg-red-50 hover:bg-red-500 text-red-600 hover:text-white font-bold text-xs px-2.5 py-1.5 rounded-xl border border-red-200 hover:border-red-500 transition-colors flex items-center gap-1 shrink-0 cursor-pointer"
                            title="이 PDF 파일 및 관련 슬라이드 모두 삭제"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>PDF 삭제</span>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* PDF Processing Overlay Indicator */}
              {isConvertingPdf && (
                <div className="bg-[#FFEBE8] border-2 border-[#FF7066] p-4 rounded-2xl flex items-center justify-center gap-3 text-[#FF7066] font-black animate-pulse">
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <span>{pdfProgressMsg}</span>
                </div>
              )}

              {/* Empty state when no photos */}
              {galleryPhotos.length === 0 && !isConvertingPdf && (
                <div className="bg-[#FFF8F0] border-2 border-dashed border-[#FF7066] p-12 rounded-3xl text-center space-y-4">
                  <div className="w-16 h-16 bg-[#FFEBE8] rounded-full flex items-center justify-center mx-auto text-[#FF7066]">
                    <UploadCloud className="w-8 h-8" />
                  </div>
                  <h4 className="font-black text-lg text-[#2D2826]">등록된 슬라이드가 없습니다</h4>
                  <p className="text-xs text-[#8C7B72] max-w-md mx-auto">
                    PDF 파일이나 이미지를 업로드하여 슬라이드 발표 자료 및 활동 갤러리를 구성해보세요.
                  </p>
                  {isAdmin ? (
                    <label className="inline-flex bg-[#FF7066] hover:bg-[#FF5C52] text-white font-black px-6 py-3 rounded-2xl text-sm items-center gap-2 cursor-pointer shadow-lg transition-transform active:scale-95">
                      <FileUp className="w-5 h-5" />
                      <span>PDF 파일 / 이미지 등록하기</span>
                      <input
                        type="file"
                        accept="image/*,application/pdf,.pdf"
                        className="hidden"
                        onChange={handleAddGalleryPhotoOrPdf}
                      />
                    </label>
                  ) : (
                    <p className="text-xs font-bold text-[#FF7066]">관리자 모드로 로그인하여 PDF를 등록해주세요.</p>
                  )}
                </div>
              )}

              {/* GRID VIEW MODE */}
              {galleryViewMode === 'grid' && galleryPhotos.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  {galleryPhotos.map((photo, index) => (
                    <div
                      key={photo.id || index}
                      className="group relative bg-stone-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl border-2 border-[#F0E6DF] hover:border-[#FF7066] transition-all duration-300 flex flex-col"
                    >
                      {/* Image Canvas Container */}
                      <div
                        onClick={() => handleStartPptPresentation(index)}
                        className="relative aspect-video w-full flex items-center justify-center cursor-pointer overflow-hidden bg-stone-900"
                      >
                        <img
                          src={photo.url}
                          alt={photo.title}
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            const target = e.currentTarget;
                            if (target.src.endsWith('.JPG')) {
                              target.src = target.src.replace('.JPG', '.jpg');
                            } else if (target.src.endsWith('.jpg')) {
                              target.src = target.src.replace('.jpg', '.JPG');
                            }
                          }}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />

                        {/* Top Action Toolbar (Admin) */}
                        {isAdmin && (
                          <div className="absolute top-3 right-3 flex items-center gap-1.5 z-20 pointer-events-auto">
                            {/* Move Left */}
                              {index > 0 && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleMoveSlide(index, 'left');
                                  }}
                                  className="p-1.5 bg-black/70 hover:bg-[#FF7066] text-white rounded-xl shadow-md transition-colors cursor-pointer"
                                  title="왼쪽(위)으로 이동"
                                >
                                  <ArrowLeft className="w-4 h-4" />
                                </button>
                              )}

                              {/* Move Right */}
                              {index < galleryPhotos.length - 1 && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleMoveSlide(index, 'right');
                                  }}
                                  className="p-1.5 bg-black/70 hover:bg-[#FF7066] text-white rounded-xl shadow-md transition-colors cursor-pointer"
                                  title="오른쪽(아래)으로 이동"
                                >
                                  <ArrowRight className="w-4 h-4" />
                                </button>
                              )}

                              {/* Replace Slide */}
                              <label
                                onClick={(e) => e.stopPropagation()}
                                className="p-1.5 bg-black/70 hover:bg-[#FF7066] text-white rounded-xl shadow-md cursor-pointer transition-colors flex items-center gap-1 text-xs font-bold px-2"
                                title="이 슬라이드 사진/PDF 교체"
                              >
                                <Camera className="w-4 h-4" />
                                <span className="hidden sm:inline">교체</span>
                                <input
                                  type="file"
                                  accept="image/*,application/pdf,.pdf"
                                  className="hidden"
                                  onChange={(e) => handleReplaceGalleryPhoto(index, e)}
                                />
                              </label>

                              {/* Delete Slide */}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteSlide(index);
                                }}
                                className="p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-md transition-colors cursor-pointer"
                                title="이 슬라이드 삭제"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                        </div>

                      {/* Bottom Title Bar & Edit Mode */}
                      <div className="p-4 bg-[#FFFBF7] border-t border-[#F0E6DF] flex items-center justify-between gap-2">
                        {editingTitleIndex === index ? (
                          <div className="flex items-center gap-2 w-full">
                            <input
                              type="text"
                              value={editingTitleText}
                              onChange={(e) => setEditingTitleText(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') handleSaveEditTitle(index);
                                if (e.key === 'Escape') setEditingTitleIndex(null);
                              }}
                              autoFocus
                              className="flex-1 bg-white border-2 border-[#FF7066] rounded-xl px-3 py-1.5 text-xs font-bold text-[#2D2826] focus:outline-none"
                              placeholder="슬라이드 제목 입력"
                            />
                            <button
                              onClick={() => handleSaveEditTitle(index)}
                              className="bg-[#FF7066] hover:bg-[#FF5C52] text-white p-2 rounded-xl font-bold transition-colors cursor-pointer"
                              title="제목 저장"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setEditingTitleIndex(null)}
                              className="bg-stone-200 hover:bg-stone-300 text-[#5C4E46] p-2 rounded-xl font-bold transition-colors cursor-pointer"
                              title="취소"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <>
                            <div className="flex items-center gap-2 truncate flex-1">
                              <span className="font-black text-sm text-[#2D2826] truncate">
                                {index + 1}. {photo.title}
                              </span>
                            </div>

                            {isAdmin && (
                              <button
                                onClick={() => handleStartEditTitle(index, photo.title)}
                                className="p-1.5 text-[#8C7B72] hover:text-[#FF7066] hover:bg-[#FFEBE8] rounded-xl transition-colors cursor-pointer"
                                title="제목 수정"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Admin Add New Photo / PDF Card */}
                  {isAdmin && (
                    <label className="border-2 border-dashed border-[#FF7066] hover:bg-[#FFEBE8]/50 rounded-3xl aspect-video w-full flex flex-col items-center justify-center gap-3 cursor-pointer transition-colors p-6 text-[#FF7066]">
                      <div className="p-4 bg-[#FFEBE8] rounded-full">
                        <UploadCloud className="w-8 h-8 text-[#FF7066]" />
                      </div>
                      <span className="font-black text-base">새 PDF 발표자료 또는 이미지 추가</span>
                      <span className="text-xs font-semibold text-[#8C7B72] text-center">
                        PDF 문서를 올리시면 자동으로 16:9 PPT 슬라이드로 분할 변환됩니다.
                      </span>
                      <input
                        type="file"
                        accept="image/*,application/pdf,.pdf"
                        className="hidden"
                        onChange={handleAddGalleryPhotoOrPdf}
                      />
                    </label>
                  )}
                </div>
              )}

              {/* LIST VIEW MODE (PDF & SLIDE TABLE) */}
              {galleryViewMode === 'list' && galleryPhotos.length > 0 && (
                <div className="bg-white rounded-3xl border-2 border-[#F0E6DF] overflow-hidden shadow-xs space-y-0">
                  <div className="p-4 bg-[#FFFBF7] border-b border-[#F0E6DF] flex items-center justify-between">
                    <h5 className="font-black text-sm text-[#2D2826] flex items-center gap-2">
                      <List className="w-4 h-4 text-[#FF7066]" />
                      <span>전체 슬라이드 상세 목록 (총 {galleryPhotos.length}장)</span>
                    </h5>
                    <span className="text-xs text-[#8C7B72] font-extrabold">
                      각 슬라이드의 [삭제] 버튼을 누르시면 개별 삭제됩니다.
                    </span>
                  </div>

                  <div className="divide-y divide-[#F5E2D5]">
                    {galleryPhotos.map((photo, index) => (
                      <div
                        key={photo.id || index}
                        className="p-3.5 sm:p-4 hover:bg-[#FFF8F0]/60 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                      >
                        {/* Slide Thumbnail & Info */}
                        <div className="flex items-center gap-3.5 flex-1 min-w-0">
                          {/* Number Badge */}
                          <span className="w-8 h-8 bg-[#2D2826] text-white font-black text-xs rounded-xl flex items-center justify-center shrink-0 shadow-2xs">
                            #{index + 1}
                          </span>

                          {/* 16:9 Micro Preview Thumbnail */}
                          <div
                            onClick={() => handleStartPptPresentation(index)}
                            className="w-24 sm:w-28 aspect-video bg-stone-900 rounded-xl overflow-hidden border border-[#F0E6DF] cursor-pointer hover:opacity-90 relative group shrink-0"
                          >
                            <img
                              src={photo.url}
                              alt={photo.title}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity">
                              <ZoomIn className="w-4 h-4" />
                            </div>
                          </div>

                          {/* Slide Title & PDF Origin Tag */}
                          <div className="flex-1 min-w-0 space-y-1">
                            {editingTitleIndex === index ? (
                              <div className="flex items-center gap-2 max-w-md">
                                <input
                                  type="text"
                                  value={editingTitleText}
                                  onChange={(e) => setEditingTitleText(e.target.value)}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') handleSaveEditTitle(index);
                                    if (e.key === 'Escape') setEditingTitleIndex(null);
                                  }}
                                  autoFocus
                                  className="flex-1 bg-white border-2 border-[#FF7066] rounded-xl px-2.5 py-1 text-xs font-bold text-[#2D2826]"
                                />
                                <button
                                  onClick={() => handleSaveEditTitle(index)}
                                  className="bg-[#FF7066] text-white p-1.5 rounded-lg font-bold"
                                >
                                  <Check className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => setEditingTitleIndex(null)}
                                  className="bg-stone-200 text-[#5C4E46] p-1.5 rounded-lg"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                <h6 className="font-extrabold text-xs sm:text-sm text-[#2D2826] truncate">
                                  {photo.title}
                                </h6>
                                {isAdmin && (
                                  <button
                                    onClick={() => handleStartEditTitle(index, photo.title)}
                                    className="p-1 text-[#8C7B72] hover:text-[#FF7066] rounded transition-colors"
                                    title="제목 변경"
                                  >
                                    <Edit3 className="w-3.5 h-3.5" />
                                  </button>
                                )}
                              </div>
                            )}

                            {/* PDF Origin Badge */}
                            <div className="flex items-center gap-2 text-[11px] text-[#8C7B72] font-semibold">
                              <span className="bg-[#FFF0E6] text-[#FF7066] px-2 py-0.5 rounded-md border border-[#FFD2BC] font-bold">
                                {photo.pdfName || '개별 이미지'}
                              </span>
                              {photo.pageNum && (
                                <span>페이지 {photo.pageNum}/{photo.totalPages}p</span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Slide Action Buttons */}
                        <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                          {isAdmin && (
                            <>
                              {/* Reorder Up */}
                              {index > 0 && (
                                <button
                                  onClick={() => handleMoveSlide(index, 'left')}
                                  className="p-1.5 bg-stone-100 hover:bg-stone-200 text-[#2D2826] rounded-xl transition-colors cursor-pointer"
                                  title="위로 이동"
                                >
                                  <ArrowLeft className="w-3.5 h-3.5 rotate-90" />
                                </button>
                              )}

                              {/* Reorder Down */}
                              {index < galleryPhotos.length - 1 && (
                                <button
                                  onClick={() => handleMoveSlide(index, 'right')}
                                  className="p-1.5 bg-stone-100 hover:bg-stone-200 text-[#2D2826] rounded-xl transition-colors cursor-pointer"
                                  title="아래로 이동"
                                >
                                  <ArrowRight className="w-3.5 h-3.5 rotate-90" />
                                </button>
                              )}

                              {/* Delete Individual Slide */}
                              <button
                                onClick={() => handleDeleteSlide(index)}
                                className="bg-red-50 hover:bg-red-500 text-red-600 hover:text-white font-bold text-xs px-2.5 py-1.5 rounded-xl border border-red-200 hover:border-red-500 transition-colors flex items-center gap-1 cursor-pointer"
                                title="이 슬라이드 삭제"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>삭제</span>
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Regular Curriculum Lesson Plan View */}
          {!isPadlet && !isWebApp && !isGalleryType && (
            <>
              {/* Main Large Display Banner Image (16:9 Aspect Ratio) */}
              <div className="relative rounded-3xl overflow-hidden border-2 border-[#F5E2D5] bg-[#FFF8F0] aspect-video w-full shadow-md group/mainPhoto cursor-pointer"
                   onClick={() => mainImgUrl && handleStartPptPresentation(0)}>
                {mainImgUrl ? (
                  <img
                    src={mainImgUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover/mainPhoto:scale-102 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-[#FFF3E8] text-[#8C7B72]">
                    <ImageIcon className="w-12 h-12 text-[#FF7066]" />
                    <span className="text-base font-bold">대표 이미지가 설정되지 않았습니다.</span>
                  </div>
                )}



                {/* Direct Main Photo Edit Button (Admin mode only) */}
                {isAdmin && (
                  <label 
                    onClick={(e) => e.stopPropagation()}
                    className="absolute bottom-4 right-4 bg-[#2D2826]/90 hover:bg-[#FF7066] text-white px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 cursor-pointer shadow-xl backdrop-blur-md transition-all hover:scale-105 border border-white/40 z-20"
                    title="메인 대표 사진 등록/변경"
                  >
                    <Camera className="w-4 h-4 text-white" />
                    <span>메인 사진 변경</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleMainImgUpload}
                    />
                  </label>
                )}
              </div>

              {/* Course Overview */}
              <div className="space-y-3 bg-[#FFF8F0] p-5 sm:p-6 rounded-3xl border border-[#F5E2D5]">
                <h4 className="font-black text-[#2D2826] text-base sm:text-lg flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#FF7066]" />
                  <span>수업 개요 & 교육 내용</span>
                </h4>
                <p className="text-[#2D2826] text-sm sm:text-base font-bold leading-relaxed">
                  {item.summary}
                </p>
                {item.detailDescription && (
                  <p className="text-[#6B5B52] text-xs sm:text-sm leading-relaxed border-t border-[#F5E2D5] pt-3 font-semibold">
                    {item.detailDescription}
                  </p>
                )}

                {item.schoolLocation && (
                  <div className="flex items-center gap-2 text-[#1B6E32] font-black text-xs sm:text-sm pt-1">
                    <MapPin className="w-4 h-4 shrink-0" />
                    <span>출강 장소: {item.schoolLocation}</span>
                  </div>
                )}
              </div>

              {/* Lesson Outline Breakdown with Large Gallery Layout */}
              {item.lessonOutline && item.lessonOutline.length > 0 && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between border-b-2 border-[#F5E2D5] pb-3">
                    <h4 className="font-black text-[#2D2826] text-lg sm:text-xl flex items-center gap-2">
                      <Award className="w-6 h-6 text-[#FF7066]" />
                      <span>📸 차시별 수업 현장 & 활동 갤러리 ({item.lessonOutline.length}차시)</span>
                    </h4>
                  </div>
                  {/* Large Photo Gallery Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {item.lessonOutline.map((outline) => {
                      const currentSessImg = sessionImages[outline.lessonNumber];

                      return (
                        <div
                          key={outline.lessonNumber}
                          className="bg-white border-2 border-[#F5E2D5] hover:border-[#FF7066] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                        >
                          {/* Top Large Photo Canvas (16:9 Aspect Ratio) */}
                          <div 
                            className="relative aspect-video w-full bg-stone-100 overflow-hidden cursor-pointer group/photo"
                            onClick={() => currentSessImg && handleStartPptPresentation(0)}
                          >
                            <SessionThumbnail
                              sessionNumber={outline.lessonNumber}
                              title={outline.title}
                              concept={outline.title}
                              sessionImgUrl={currentSessImg}
                            />



                            {/* Camera Change Button for Admin */}
                            {isAdmin && (
                              <label 
                                onClick={(e) => e.stopPropagation()}
                                className="absolute top-3 right-3 bg-[#FF7066] hover:bg-[#e0564c] text-white px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-1.5 cursor-pointer transition-transform hover:scale-105 active:scale-95 border border-white/40 z-20 text-xs font-black"
                                title="차시 사진 등록/변경"
                              >
                                <Camera className="w-4 h-4 text-white" />
                                <span>사진 변경</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => handleSessionImgUpload(outline.lessonNumber, e)}
                                />
                              </label>
                            )}
                          </div>

                          {/* Bottom Lesson Description */}
                          <div className="p-5 bg-[#FFFBF7] space-y-2.5 border-t border-[#F5E2D5]">
                            <div className="flex items-center gap-2">
                              <h5 className="text-base font-black text-[#2D2826] group-hover:text-[#FF7066] transition-colors truncate">
                                {outline.title}
                              </h5>
                            </div>

                            <p className="text-xs sm:text-sm text-[#5C4E46] font-extrabold leading-relaxed bg-white p-3 rounded-2xl border border-[#F5E2D5]">
                              💡 {outline.objective}
                            </p>

                            <div className="pt-1 flex items-center justify-between text-xs font-bold text-[#8C7B72]">
                              <span className="flex items-center gap-1 text-[#1B6E32]">
                                <CheckCircle2 className="w-4 h-4 text-[#FF7066]" />
                                실습 및 아이디어 프로젝트
                              </span>
                            </div>
                          </div>

                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-[#F5E2D5]">
                {item.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-[#FFF5EE] text-[#6B5B52] border border-[#FFD2BC] text-xs font-bold px-3.5 py-1.5 rounded-full shadow-2xs"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </>
          )}

          {/* Next Curriculum Navigation Button */}
          {nextPortfolioItem && (
            <div className="pt-8 border-t-2 border-[#F5E2D5] flex justify-center">
              <button
                onClick={() => {
                  if (onSelectItem) {
                    onSelectItem(nextPortfolioItem);
                  }
                  if (modalContentRef.current) {
                    modalContentRef.current.scrollTop = 0;
                  }
                }}
                className="w-full sm:w-auto min-w-[320px] sm:min-w-[440px] bg-gradient-to-r from-[#FF7066] to-[#FF5A4D] hover:from-[#FF5A4D] hover:to-[#E0483B] text-white font-black text-lg sm:text-xl px-8 py-5 rounded-2xl transition-all duration-150 shadow-md hover:shadow-lg active:scale-98 cursor-pointer flex items-center justify-center gap-3 group"
              >
                <span>다음 과정 ({nextPortfolioItem.title}) 바로가기</span>
                <ArrowRight className="w-6 h-6 stroke-[3] group-hover:translate-x-1.5 transition-transform" />
              </button>
            </div>
          )}

        </div>

      </div>

      {/* Fullscreen PPT Presentation Slide Viewer Modal */}
      {activeSlideIndex !== null && galleryPhotos.length > 0 && (
        <div className="fixed inset-0 z-60 flex flex-col items-center justify-between bg-black/95 text-white animate-in fade-in p-3 sm:p-6 backdrop-blur-md">
          
          {/* Top Control Bar */}
          <div className="w-full max-w-7xl flex items-center justify-between py-2 border-b border-stone-800">
            <div className="flex items-center gap-3">
              <span className="bg-[#FF7066] text-white font-black text-xs px-3 py-1 rounded-full flex items-center gap-1.5">
                <Presentation className="w-3.5 h-3.5" />
                <span>PPT 슬라이드 모드</span>
              </span>
              <span className="font-extrabold text-sm sm:text-base text-stone-200 truncate max-w-md">
                {galleryPhotos[activeSlideIndex]?.title || item.title}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Slide Counter */}
              <div className="bg-stone-800 text-stone-300 font-black text-xs sm:text-sm px-3.5 py-1.5 rounded-xl border border-stone-700">
                {activeSlideIndex + 1} / {galleryPhotos.length}
              </div>

              {/* Auto Play Toggle */}
              <button
                onClick={() => setIsAutoPlay(!isAutoPlay)}
                className={`flex items-center gap-1.5 text-xs font-black px-3.5 py-1.5 rounded-xl transition-colors cursor-pointer ${
                  isAutoPlay
                    ? 'bg-[#FF7066] text-white shadow-lg'
                    : 'bg-stone-800 hover:bg-stone-700 text-stone-300 border border-stone-700'
                }`}
              >
                {isAutoPlay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isAutoPlay ? '자동재생 중' : '자동재생'}</span>
              </button>

              {/* Close Button */}
              <button
                onClick={() => {
                  setActiveSlideIndex(null);
                  setIsPptMode(false);
                  setIsAutoPlay(false);
                }}
                className="bg-[#FF5A4D] hover:bg-[#FF4235] text-white p-2.5 rounded-xl font-black shadow-md transition-all hover:scale-110 cursor-pointer border-2 border-white"
                title="슬라이드 닫기 (ESC)"
              >
                <X className="w-5 h-5 stroke-[3]" />
              </button>
            </div>
          </div>

          {/* Main 16:9 Presentation Stage Canvas */}
          <div className="relative w-full max-w-6xl flex-1 flex items-center justify-center my-2 sm:my-4 group">
            
            {/* Slide Image */}
            <div className="relative w-full aspect-video bg-stone-900 rounded-3xl overflow-hidden shadow-2xl border border-stone-800 flex items-center justify-center">
              <img
                src={galleryPhotos[activeSlideIndex]?.url}
                alt={galleryPhotos[activeSlideIndex]?.title}
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src.endsWith('.JPG')) {
                    target.src = target.src.replace('.JPG', '.jpg');
                  } else if (target.src.endsWith('.jpg')) {
                    target.src = target.src.replace('.jpg', '.JPG');
                  }
                }}
                className="w-full h-full object-contain"
              />

              {/* Title overlay at bottom of current slide */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 sm:p-6 text-center">
                <p className="text-white font-black text-base sm:text-lg drop-shadow-md">
                  {galleryPhotos[activeSlideIndex]?.title}
                </p>
              </div>
            </div>

            {/* Left Arrow Button */}
            <button
              onClick={() =>
                setActiveSlideIndex((prev) =>
                  prev !== null ? (prev - 1 + galleryPhotos.length) % galleryPhotos.length : 0
                )
              }
              className="absolute left-2 sm:-left-6 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-[#FF7066] text-white p-3 sm:p-4 rounded-full shadow-2xl transition-all cursor-pointer border border-white/20 hover:scale-110 active:scale-95"
              title="이전 슬라이드 (←)"
            >
              <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>

            {/* Right Arrow Button */}
            <button
              onClick={() =>
                setActiveSlideIndex((prev) => (prev !== null ? (prev + 1) % galleryPhotos.length : 0))
              }
              className="absolute right-2 sm:-right-6 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-[#FF7066] text-white p-3 sm:p-4 rounded-full shadow-2xl transition-all cursor-pointer border border-white/20 hover:scale-110 active:scale-95"
              title="다음 슬라이드 (→)"
            >
              <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>
          </div>

          {/* Bottom Thumbnail Navigation Strip */}
          <div className="w-full max-w-6xl overflow-x-auto py-2 flex items-center gap-2 sm:gap-3 scrollbar-thin scrollbar-thumb-stone-700">
            {galleryPhotos.map((photo, idx) => (
              <button
                key={photo.id || idx}
                onClick={() => setActiveSlideIndex(idx)}
                className={`relative shrink-0 w-20 sm:w-28 aspect-video rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                  activeSlideIndex === idx
                    ? 'border-[#FF7066] ring-2 ring-[#FF7066]/50 scale-105'
                    : 'border-stone-700 opacity-50 hover:opacity-100'
                }`}
              >
                <img src={photo.url} alt={photo.title} className="w-full h-full object-cover" />
                <div className="absolute top-1 left-1 bg-black/70 text-white font-black text-[10px] px-1.5 rounded">
                  {idx + 1}
                </div>
              </button>
            ))}
          </div>

        </div>
      )}

    </div>
  );
};
