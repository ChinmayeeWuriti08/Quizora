import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

const BlindChallenge = () => {
  const navigate = useNavigate();

  const randomQuiz = useQuery(api.quizzes.getRandomQuiz);
  const createBlindSession = useMutation(api.sessions.createBlindSession);

  useEffect(() => {
  const startBlind = async () => {
    console.log("randomQuiz:", randomQuiz);

    if (randomQuiz) {
      try {
        console.log("Creating session...");

          const { sessionId, participantId } = await createBlindSession({
            quizId: randomQuiz._id,
          });

        navigate(`/play/${sessionId}?participant=${participantId}`);
      } catch (err) {
        console.error("Error creating blind session:", err);
      }
    }
  };

  startBlind();
}, [randomQuiz, createBlindSession, navigate]);


  if (!randomQuiz) {
    return <div style={{ padding: "2rem" }}>Finding a random quiz...</div>;
  }

  return null;
};

export default BlindChallenge;
