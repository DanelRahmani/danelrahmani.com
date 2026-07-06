import { ExternalLink } from '../components/ExternalLink';
import { GitHubIcon } from '../components/icons/GitHubIcon';
import { InstagramIcon } from '../components/icons/InstagramIcon';
import { XIcon } from '../components/icons/XIcon';
import { LinkedInIcon } from '../components/icons/LinkedInIcon';
import MyWebsite from '../images/logos/mywebsite.png';
import ServerLogo from '../images/logos/server.png';
import RahmaniLogo from '../images/logos/rahmani.svg';
import AxiomDigitalLogo from '../images/logos/axiom-digital-logo.png';
import { manual } from 'prismjs';

export const Name = 'Danel Rahmani';

export const About = (
  <>
    {` This is my personal website, featuring my resume, my thoughts, and projects I've worked on.
    If you want to get in touch`}{' '}
    <ExternalLink href="mailto:danelrahmani@outlook.com">send me an email.</ExternalLink>
  </>
);
export const AboutExtended = `I am a student at the University of Groningen, and have a great many interests.`;

export type Project = {
  title: string;
  techStack: string[];
  description: string;
  logo: any;
  link?: {
    label: string;
    href: string;
  };
};

export const MyCurrentProjects: Project[] = [
  {
    title: 'Axiom Digital',
    techStack: ['Business', 'AI', 'Digital Transformation', 'Consulting'],
    description: 'My own digital agency focused on AI integration and digital transformation for businesses.',
    logo: AxiomDigitalLogo,
    link: {
      label: 'axiomdigital.nl',
      href: 'https://axiomdigital.nl',
    },
  },
  {
    title: 'My personal website',
    techStack: ['NodeJS', 'React', 'TypeScript','Notion','DNS management'],
    description: 'My personal website on the internet.',
    logo: MyWebsite,
    link: {
      label: 'GitHub Repository',
      href: 'https://github.com/DanelRahmani/website/',
    },
  },
  {
    title: 'AlefBa',
    techStack: ['NodeJS','HTML' ,'DNS management'],
    description: 'A tool to learn to Persian Alfabet',
    logo: ServerLogo,
    link: {
      label: 'Alefba',
      href: 'https://alefba.vercel.app',
    },
  },
];

export const MyPastProjects: Project[] = [
  {
    title: 'Personal Minecraft Server',
    techStack: ['Docker', 'Bash', 'Network Administration', 'Linux'],
    description: 'Past Project',
    logo: ServerLogo,
//    link: {
//      label: 'No Longer Available',
//      href: '-',
//    },
  },
];

export const SocialMedia = [
  { name: 'Twitter', link: 'https://twitter.com/DanelRahmani', icon: XIcon },
  { name: 'Instagram', link: 'https://www.instagram.com/danelrahmani/', icon: InstagramIcon },
  { name: 'Github', link: 'https://github.com/danelrahmani', icon: GitHubIcon },
  { name: 'LinkedIn', link: 'https://www.linkedin.com/in/danelrahmani', icon: LinkedInIcon },
] as const;

export const Work = [
  {
    company: 'Axiom Digital',
    title: 'Founder',
    logo: AxiomDigitalLogo,
    start: '2026',
    end: 'Present',
  },
  {
    company: 'Rahmani\'s Gordijn Kledingatelier',
    title: 'General Employee & Tailor',
    logo: RahmaniLogo,
    start: '2022',
    end: 'Present',
  },
] as const;

export const Education = [
  {
    school: 'University of Groningen',
    degree: 'BSc International Business',
    start: '2023',
    end: 'Present',
  },
  {
    school: 'Waseda University',
    degree: 'Exchange Student',
    start: '2024',
    end: '2025',
  },
] as const;

export const CompaniesLinks = [
  {
    name: 'Axiom Digital',
    link: 'https://axiomdigital.nl',
  },
  {
    name: 'Rahmani\'s Gordijn Kledingatelier',
    link: 'https://top-atelier.com/',
  },
] as const;

export const Books = [
  {
    name: 'The Kite Runner',
    link: 'https://www.goodreads.com/book/show/17165596-the-kite-runner/',
  },
] as const;
