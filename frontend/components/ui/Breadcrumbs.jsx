import Link from "next/link";

export default function Breadcrumbs({breadcrumbs}) {
    return (
        <nav>
            <ol className={"breadcrumbs"}>
                {breadcrumbs.map((breadcrumb, index) => (
                    <li key={breadcrumb.href} className={breadcrumb.active? "breadcrumb-isActive" : ""}>
                        <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
                        {index < breadcrumbs.length - 1 ? (
                            <span className={"breadcrumb-spacer"}>/</span>
                        ) : null}
                    </li>
                ))}
            </ol>
        </nav>
    )
}
