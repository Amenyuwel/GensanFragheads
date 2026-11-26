import { CommunityPosts } from "@/components/community-posts";
import { PageSection } from "@/components/page-section";
import { communityPosts } from "@/lib/data";
import { sections, site } from "@/lib/site";

/** Hand-picked subreddit posts. Hidden until community-posts.json has entries. */
export function CommunitySection() {
  if (communityPosts.length === 0) return null;
  return (
    <PageSection
      band
      id={sections.community.id}
      title={sections.community.label}
      lead={
        <>
          A few picks from members.{" "}
          <a href={site.subredditUrl} className="text-ink underline">
            See more on Reddit
          </a>
          .
        </>
      }
    >
      <CommunityPosts posts={communityPosts} />
    </PageSection>
  );
}
