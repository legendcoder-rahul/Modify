import {
    FaceLandmarker,
    FilesetResolver
} from "@mediapipe/tasks-vision";


let landmarkerInstance = null;

export const init = async ({ landmarkerRef, videoRef, streamRef }) => {
    // agar pehle se bana hai toh reuse karo
    if (landmarkerInstance) {
        landmarkerRef.current = landmarkerInstance;
    } else {
        const vision = await FilesetResolver.forVisionTasks(
            "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
        );

        landmarkerInstance = await FaceLandmarker.createFromOptions(
            vision,
            {
                baseOptions: {
                    modelAssetPath:
                        "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task"
                },
                outputFaceBlendshapes: true,
                runningMode: "VIDEO",
                numFaces: 1
            }
        );

        landmarkerRef.current = landmarkerInstance;
    }

    // webcam ek hi baar start karo
    if (!streamRef.current) {
        streamRef.current = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = streamRef.current;
        await videoRef.current.play();
    }
};

export const detect = ({ landmarkerRef, videoRef, setExpression }) => {
    if (!landmarkerRef.current || !videoRef.current) return;

    const results = landmarkerRef.current.detectForVideo(
        videoRef.current,
        Date.now()
    );

    if (!results.faceBlendshapes?.length) return;

    const blendshapes = results.faceBlendshapes[0].categories;

    const getScore = (name) =>
        blendshapes.find((b) => b.categoryName === name)?.score || 0;

    const smileLeft = getScore("mouthSmileLeft");
    const smileRight = getScore("mouthSmileRight");
    const jawOpen = getScore("jawOpen");
    const browUp = getScore("browInnerUp");
    const frownLeft = getScore("mouthFrownLeft");
    const frownRight = getScore("mouthFrownRight");

    let currentExpression = "Neutral";

    if (smileLeft > 0.5 && smileRight > 0.5) {
        currentExpression = "Happy";
    } else if (jawOpen > 0.2 && browUp > 0.2) {
        currentExpression = "Surprised";
    } else if (frownLeft > 0.2 && frownRight > 0.2) {
        currentExpression = "Sad";
    }

    setExpression(currentExpression);

    return currentExpression;
};