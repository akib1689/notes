# What actually happens when you buy a domain name

If you ever bought a domain name, you probably know that it's a simple process. You go to a domain registrar, search for the domain name you want, and buy it. But what happens when you buy a domain name? How does it work? In this article, we'll explore the process of buying a domain name and what happens behind the scenes.

## What is a domain name?

A domain name is a human-readable address that points to  When you type a domain name into your browser, it looks up the IP address associated with that domain name and connects you to the website.

## Then what is DNS?

DNS (Domain Name System) is a hierarchical system used to translate human-readable domain names (e.g., `example.com`) into IP addresses (e.g., `192.0.2.1`) that computers use to identify each other on the network.

## Registering a domain name

When you buy a domain name, you're essentially renting it from a domain registrar. The registrar is responsible for managing the domain name system and ensuring that your domain name is correctly registered and renewed. At this point you might ask, "What is a domain registrar?" 

A domain registrar is a company that manages the reservation of Internet domain names. They are accredited by the Internet Corporation for Assigned Names and Numbers (ICANN) to sell domain names. Some popular domain registrars include GoDaddy, Namecheap.

**What happens when you buy a domain**:

- You register a domain name (e.g., `example.com`) with the registrar.
- The registrar communicates with a domain registry (the organization managing the TLD, e.g., `.com` and yes there exists an organization whos sole purpose is to manage the `.com` TLD) to reserve the domain name.
- The registry records the domain and assigns it to you.
- You configure the `nameservers` for the domain during or after registration.
- The registrar updates the root zone file with the new domain information.

At this point, your domain name is live and accessible on the internet. Now, you might ask "What are nameservers?"

## What are nameservers?

Nameservers are servers that store DNS records for a domain name. When you type a domain name into your browser, your computer queries the nameservers to find the IP address associated with that domain name. The nameservers are responsible for translating the domain name into an IP address.

**What happens when you configure nameservers**:

When you register a domain name, you need to configure the nameservers for the domain. This tells the domain name system where to look for the DNS records for your domain. Typically, when you buy a domain name, the registrar will provide you with default nameservers. You can also configure custom nameservers if you want to host your DNS records on your own server. One such popular nameserver provider is Cloudflare. You can configure your domain to use Cloudflare's nameservers and manage your DNS records through their dashboard.

After configuring the nameservers, you can start adding DNS records for your domain. DNS records are used to map domain names to IP addresses and specify how email should be routed for your domain. There are different types of DNS records, such as A records, CNAME records, MX records, and TXT records. Each record type serves a different purpose and is used to configure different aspects of your domain.



