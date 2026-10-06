import React from 'react';
import { notFound } from 'next/navigation';
import { PROJECTS_DATA } from '@/data/projectsData';
import { CaseStudyClientView } from './CaseStudyClientView';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return Object.keys(PROJECTS_DATA).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const project = PROJECTS_DATA[slug];

  if (!project) {
    return {
      title: 'Project Not Found | Rahul Karnekar',
    };
  }

  return {
    title: `${project.title} — Case Study | Rahul Karnekar`,
    description: project.overview.heading,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = PROJECTS_DATA[slug];

  if (!project) {
    notFound();
  }

  return <CaseStudyClientView project={project} />;
}
