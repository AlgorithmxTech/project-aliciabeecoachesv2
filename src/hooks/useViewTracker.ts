
import { useEffect } from 'react';

const useViewTracker = (slug: string | undefined) => {
  useEffect(() => {
    if (!slug) return;

    const viewedKey = `viewed:${slug}`;
    const alreadyViewed = sessionStorage.getItem(viewedKey);

    if (!alreadyViewed) {
      // 1️⃣ POST to increment views in Redis
      fetch(`/api/articles/${slug}/views`, {
        method: 'POST',
      })
        .then(() => {

          return fetch(`/api/articles/${slug}/views`);
        })
        .then((res) => res.json())
        .then((data) => {
          console.log(`✅ View tracked in Redis: ${slug} → ${data.views} views`);
          window.dispatchEvent(new CustomEvent('articleViewUpdated', { detail: slug }));
        })
        .catch((err) => {
          console.error('Error tracking view:', err);
        });

      // 3️⃣ Set session key to prevent future tracking
      sessionStorage.setItem(viewedKey, 'true');
    } else {
      // For debug/testing
      console.log(`🔁 Already viewed: ${slug}`);
    }
  }, [slug]);
};

export default useViewTracker;