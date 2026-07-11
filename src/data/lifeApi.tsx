import { ExternalLink } from '../components/ExternalLink';
import { GitHubIcon } from '../components/icons/GitHubIcon';
import { InstagramIcon } from '../components/icons/InstagramIcon';
import { XIcon } from '../components/icons/XIcon';
import { LinkedInIcon } from '../components/icons/LinkedInIcon';
import { ThreadsIcon } from '../components/icons/ThreadsIcon';
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
  { name: 'Threads', link: 'https://www.threads.net/@danelrahmani', icon: ThreadsIcon },
  { name: 'Github', link: 'https://github.com/danelrahmani', icon: GitHubIcon },
  { name: 'LinkedIn', link: 'https://www.linkedin.com/in/danelrahmani', icon: LinkedInIcon },
] as const;

export const Work = [
  {
    company: 'Axiom Digital',
    title: 'Founder',
    logo: AxiomDigitalLogo,
    start: 'Jul 2026',
    end: 'Present',
  },
  {
    company: "Rahmani's Gordijn Kledingatelier",
    title: 'Employee',
    logo: RahmaniLogo,
    start: 'Sep 2020',
    end: 'Present',
  },
] as const;

export const Education = [
  {
    school: 'University of Groningen',
    degree: 'Honours College',
    start: 'Apr 2025',
    end: 'Jul 2027',
  },
  {
    school: 'University of Groningen',
    degree: 'BSc International Business',
    start: '2024',
    end: '2027',
  },
  {
    school: 'Rsg De Borgen',
    degree: 'VWO, E&M Profiel',
    start: 'Sep 2018',
    end: 'Jul 2024',
  },
] as const;

export const CompaniesLinks = [
  {
    name: 'Axiom Digital',
    link: 'https://axiomdigital.nl',
  },
  {
    name: "Rahmani's Gordijn Kledingatelier",
    link: 'https://top-atelier.com/',
  },
] as const;

export const Books = [
    {
    name: 'Les Miserables',
    link: 'https://www.goodreads.com/book/show/24280.Les_Mis_rables/',
  },
    {
    name: '1984',
    link: 'https://www.goodreads.com/book/show/40961427-1984/',
  },
  {
    name: 'The Kite Runner',
    link: 'https://www.goodreads.com/book/show/17165596-the-kite-runner/',
  },
  {
    name: 'The Hunger Games',
    link: 'https://www.goodreads.com/book/show/2767052-the-hunger-games/',
  },
  {
    name: 'The Maze Runner',
    link: 'https://www.goodreads.com/book/show/6186357-the-maze-runner/',
  },
] as const;

export const Music = [
  {
    name: 'Your Lie in April',
    link: 'https://www.imdb.com/title/tt3895150/',
  },
] as const;


export const Series = [
  {
    name: 'Your Lie in April',
    link: 'https://www.imdb.com/title/tt3895150/',
  },
  {
    name: 'Neon Genesis Evangelion',
    link: 'https://www.imdb.com/title/tt0112159/',
  },
  {
    name: 'Steins;Gate',
    link: 'https://www.imdb.com/title/tt1910272/',
  },
  {
    name: 'A Silent Voice',
    link: 'https://www.imdb.com/title/tt5323662/',
  },
  {
    name: 'Death Note',
    link: 'https://www.imdb.com/title/tt0877057/',
  },
] as const;
